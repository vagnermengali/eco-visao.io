const API_URL = "http://localhost:3000";

const ROLE_LABEL = { user: "Usuário", moderator: "Moderador", admin: "Administrador" };

const TYPE_CONFIG = {
  desmatamento: { label: "Desmatamento", title: "Monitoramento de Desmatamento", icon: "fa-tree", color: "text-green-600" },
  queimadas: { label: "Queimadas", title: "Monitoramento de Queimadas", icon: "fa-fire", color: "text-red-500" },
  mineracao: { label: "Mineração", title: "Monitoramento de Mineração", icon: "fa-mountain", color: "text-gray-600" },
  fauna: { label: "Fauna", title: "Monitoramento de Fauna", icon: "fa-paw", color: "text-blue-500" },
};

const CATEGORY_LABEL = { desmatamento: "Desmatamento", queimadas: "Queimadas", mineracao: "Mineração", fauna: "Fauna", legislacao: "Legislação", monitoramento: "Monitoramento", todos: "Todos" };
const categoryLabel = (c) => CATEGORY_LABEL[c] || c.charAt(0).toUpperCase() + c.slice(1);

async function api(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) throw new Error(`Erro ${res.status} em ${path}`);
  return res.status === 204 ? null : res.json();
}

const getUserId = () => localStorage.getItem("userId");
/** Editar/excluir: somente o dono do conteúdo ou o administrador. */
const canModify = (ownerId) => getRole() === "admin" || ownerId === getUserId();
const getRole = () => localStorage.getItem("role") || "visitor";

function setSession(user) {
  localStorage.setItem("userId", user.id);
  localStorage.setItem("role", user.role || "user");
}

function logout() {
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}

/** Redireciona para o login se não houver sessão ou o perfil não for permitido. */
function requireAuth(roles) {
  if (!getUserId()) {
    window.location.href = "login.html";
    return false;
  }
  if (roles && !roles.includes(getRole())) {
    alert("Você não possui permissão para acessar esta página.");
    window.location.href = "dashboard.html";
    return false;
  }
  return true;
}

function esc(value) {
  const div = document.createElement("div");
  div.textContent = value ?? "";
  return div.innerHTML;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatDateTime(iso) {
  return new Date(iso).toLocaleString("pt-BR");
}

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/** Diálogo de confirmação reutilizável (substitui confirm()). */
function confirmDialog(message, confirmLabel = "Confirmar") {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.setAttribute("role", "alertdialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML = `
      <div class="modal-box" style="max-width:24rem">
        <div class="flex items-start gap-3 mb-5">
          <span class="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0"><i class="fas fa-triangle-exclamation"></i></span>
          <p class="text-gray-800 pt-2">${esc(message)}</p>
        </div>
        <div class="flex justify-end gap-3">
          <button data-r="0" class="btn btn-secondary">Cancelar</button>
          <button data-r="1" class="btn btn-solid-danger">${esc(confirmLabel)}</button>
        </div>
      </div>`;
    const done = (v) => {
      document.removeEventListener("keydown", onKey);
      overlay.remove();
      resolve(v);
    };
    const onKey = (e) => e.key === "Escape" && done(false);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) return done(false);
      const r = e.target.closest("[data-r]")?.dataset.r;
      if (r !== undefined) done(r === "1");
    });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(overlay);
    overlay.querySelector('[data-r="0"]').focus();
  });
}

function toast(message, type = "success") {
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.setAttribute("role", type === "error" ? "alert" : "status");
  el.innerHTML = `<i class="fas ${type === "error" ? "fa-circle-exclamation" : "fa-circle-check"}"></i><span>${esc(message)}</span>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

/** Badge colorido do tipo de ocorrência. */
function typeBadge(type) {
  const c = TYPE_CONFIG[type];
  return `<span class="badge badge-${esc(type)}"><i class="fas ${c?.icon || "fa-bell"}"></i>${esc(c?.label || type)}</span>`;
}

function roleBadge(role) {
  return `<span class="badge badge-role-${esc(role)}">${esc(ROLE_LABEL[role] || role)}</span>`;
}

/** Estado vazio padronizado. */
function emptyState(icon, text) {
  return `<div class="empty-state"><i class="fas ${icon}"></i><p>${esc(text)}</p></div>`;
}

/** Fecha modais .modal-overlay com Esc ou clique no fundo; foca o primeiro campo ao abrir. */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") document.querySelectorAll(".modal-overlay:not(.hidden):not([role=alertdialog])").forEach((m) => m.classList.add("hidden"));
});
document.addEventListener("click", (e) => {
  if (e.target.classList?.contains("modal-overlay") && e.target.getAttribute("role") === "dialog") e.target.classList.add("hidden");
});

const NAV_LINKS = [
  { href: "dashboard.html", icon: "fa-chart-bar", label: "Dados Ambientais", roles: ["user", "moderator", "admin"] },
  { href: "my-alerts.html", icon: "fa-bell", label: "Alertas e Mapa", roles: ["user", "moderator", "admin"] },
  { href: "forum.html", icon: "fa-comments", label: "Fórum", roles: ["user", "moderator", "admin"] },
  { href: "learn.html", icon: "fa-book-open", label: "Conteúdos Educativos", roles: ["user", "moderator", "admin"] },
  { href: "reports.html", icon: "fa-file-lines", label: "Relatório Mensal", roles: ["user", "moderator", "admin"] },
  { href: "moderation.html", icon: "fa-shield-halved", label: "Moderação", roles: ["moderator", "admin"] },
  { href: "admin.html", icon: "fa-gear", label: "Administração", roles: ["admin"] },
];

/** Monta a sidebar padrão (RNF-012) dentro de <aside id="sidebar">. */
async function renderSidebar(activeHref) {
  const aside = document.getElementById("sidebar");
  if (!aside) return;
  const role = getRole();
  let name = "Usuário";
  let avatar = "";
  try {
    const user = await api(`/users/${getUserId()}`);
    name = `${user.firstName} ${user.lastName}`.trim();
    avatar = user.avatar || "";
    const emailEl = document.getElementById("userEmail");
    if (emailEl) emailEl.textContent = user.email;
  } catch (err) {
    console.error(err);
  }
  const links = NAV_LINKS.filter((l) => l.roles.includes(role))
    .map(
      (l) => `<li><a href="./${l.href}" class="nav-link ${l.href === activeHref ? "active" : ""}" ${
        l.href === activeHref ? 'aria-current="page"' : ""
      }><i class="fas ${l.icon} w-5 text-center"></i> ${l.label}</a></li>`
    )
    .join("");
  aside.className =
    "fixed lg:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-green-700 to-green-800 z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 flex flex-col shrink-0";
  aside.setAttribute("aria-label", "Menu principal");
  aside.innerHTML = `
    <div class="px-5 py-5 border-b border-white/15">
      <div class="flex items-center justify-between">
        <a href="./dashboard.html" class="flex items-center gap-2 text-white font-bold text-xl"><i class="fas fa-leaf"></i> EcoVisão</a>
        <button id="closeSidebar" class="lg:hidden text-white" aria-label="Fechar menu"><i class="fas fa-times"></i></button>
      </div>
    </div>
    <nav class="flex-1 px-4 py-5 overflow-y-auto" aria-label="Navegação"><ul class="space-y-1">${links}</ul></nav>
    <div class="p-4 border-t border-white/15 space-y-3">
      <a href="./profile.html" class="flex items-center gap-3 rounded-lg p-2 hover:bg-white/10 text-white" title="Meu perfil">
        <span class="avatar">${avatar ? `<img src="${esc(avatar)}" alt="" onerror="this.remove()" />` : ""}<span class="avatar-initial">${esc(name.charAt(0).toUpperCase())}</span></span>
        <span class="min-w-0"><span class="block text-sm font-semibold truncate">${esc(name)}</span><span class="block text-xs text-white/70">${ROLE_LABEL[role] || ""}</span></span>
      </a>
      <button id="logoutBtn" class="nav-link w-full"><i class="fas fa-sign-out-alt w-5 text-center"></i> Sair</button>
    </div>`;
  document.getElementById("logoutBtn").addEventListener("click", logout);

  const backdrop = document.getElementById("sidebarBackdrop");
  const close = () => {
    aside.classList.add("-translate-x-full");
    backdrop?.classList.add("hidden");
  };
  document.getElementById("closeSidebar").addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  document.getElementById("openSidebar")?.addEventListener("click", () => {
    aside.classList.remove("-translate-x-full");
    backdrop?.classList.remove("hidden");
  });
}
