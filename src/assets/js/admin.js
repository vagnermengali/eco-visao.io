// Administração da plataforma (CSU11): visão geral, contas de usuários e conteúdos educativos.
let tab = "overview";
let editingContentId = null;

const el = (id) => document.getElementById(id);
const panel = () => el("adminPanel");

async function renderOverview() {
  const [users, alerts, posts, comments, contents] = await Promise.all(
    ["users", "alerts", "posts", "comments", "contents"].map((c) => api(`/${c}`))
  );
  const card = (label, n, icon) => `<div class="card"><div class="flex items-center justify-between mb-3"><span class="font-medium text-gray-600 text-sm">${label}</span><span class="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"><i class="fas ${icon}"></i></span></div><p class="text-3xl font-bold text-gray-800">${n}</p></div>`;
  panel().innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    ${card("Usuários", users.length, "fa-users")}${card("Alertas", alerts.length, "fa-bell")}${card("Publicações", posts.length, "fa-comments")}
    ${card("Comentários", comments.length, "fa-comment")}${card("Conteúdos educativos", contents.length, "fa-book-open")}</div>`;
}

async function renderUsers() {
  const users = await api("/users");
  const me = getUserId();
  panel().innerHTML = `<div class="card card-flush overflow-x-auto"><table class="w-full text-sm">
    <thead><tr class="text-left border-b"><th class="p-3">Nome</th><th class="p-3">E-mail</th><th class="p-3">Perfil</th><th class="p-3"></th></tr></thead><tbody>
    ${users
      .map(
        (u) => `<tr class="border-b" data-id="${esc(u.id)}"><td class="p-3">${esc(u.firstName)} ${esc(u.lastName)}</td><td class="p-3">${esc(u.email)}</td>
        <td class="p-3"><select data-act="role" class="border rounded px-2 py-1" ${u.id === me ? "disabled" : ""}>
          ${Object.entries(ROLE_LABEL).map(([k, v]) => `<option value="${k}" ${u.role === k ? "selected" : ""}>${v}</option>`).join("")}</select></td>
        <td class="p-3 text-right">${u.id === me ? `<span class="text-xs text-gray-400">você</span>` : `<button data-act="delete" class="text-red-600 hover:underline">Excluir conta</button>`}</td></tr>`
      )
      .join("")}</tbody></table></div>`;
}

async function renderContents() {
  const contents = await api("/contents");
  panel().innerHTML = `<div class="flex justify-end mb-4"><button id="newContent" class="btn btn-primary"><i class="fas fa-plus"></i> Novo conteúdo</button></div>
    <div class="space-y-3">${
      contents
        .map(
          (c) => `<div class="card card-sm flex justify-between gap-4" data-id="${esc(c.id)}">
          <div><p class="font-medium">${esc(c.title)}</p><p class="text-xs text-gray-400">${esc(categoryLabel(c.category))} · ${formatDate(c.createdAt)}</p><p class="text-sm text-gray-600">${esc(c.summary)}</p></div>
          <div class="flex gap-2 shrink-0 self-start"><button data-act="edit" class="btn btn-info btn-sm">Editar</button>
          <button data-act="delete" class="btn btn-danger btn-sm">Excluir</button></div></div>`
        )
        .join("") || `<p class="text-gray-500">Nenhum conteúdo cadastrado.</p>`
    }</div>`;
  el("newContent").addEventListener("click", () => openContentForm());
  panel().dataset.contents = JSON.stringify(contents);
}

function openContentForm(c) {
  editingContentId = c?.id || null;
  el("cfTitle").textContent = c ? "Editar conteúdo" : "Novo conteúdo";
  el("cfName").value = c?.title || "";
  el("cfCategory").value = c?.category || "";
  el("cfSummary").value = c?.summary || "";
  el("cfBody").value = c?.body || "";
  el("cfError").classList.add("hidden");
  el("contentFormModal").classList.remove("hidden");
}

async function saveContent() {
  const data = {
    title: el("cfName").value.trim(),
    category: el("cfCategory").value.trim().toLowerCase(),
    summary: el("cfSummary").value.trim(),
    body: el("cfBody").value.trim(),
  };
  if (Object.values(data).some((v) => !v)) {
    el("cfError").textContent = "Preencha todos os campos.";
    return el("cfError").classList.remove("hidden");
  }
  try {
    if (editingContentId) await api(`/contents/${editingContentId}`, { method: "PATCH", body: data });
    else await api("/contents", { method: "POST", body: { id: newId(), ...data, createdAt: new Date().toISOString() } });
    el("contentFormModal").classList.add("hidden");
    toast("Conteúdo salvo.");
    render();
  } catch (err) {
    el("cfError").textContent = "Não foi possível salvar. Tente novamente.";
    el("cfError").classList.remove("hidden");
  }
}

async function render() {
  document.querySelectorAll("#adminTabs button").forEach((b) => {
    const on = b.dataset.tab === tab;
    b.className = `chip ${on ? "active" : ""}`;
  });
  try {
    await { overview: renderOverview, users: renderUsers, contents: renderContents }[tab]();
  } catch (err) {
    console.error(err);
    panel().innerHTML = `<p class="text-red-600">Não foi possível carregar os dados. Tente novamente.</p>`;
  }
}

async function onPanelClick(e) {
  const act = e.target.closest("[data-act]")?.dataset.act;
  const id = e.target.closest("[data-id]")?.dataset.id;
  if (!act || !id) return;
  try {
    if (tab === "contents") {
      if (act === "edit") openContentForm(JSON.parse(panel().dataset.contents).find((c) => c.id === id));
      if (act === "delete" && (await confirmDialog("Excluir este conteúdo educativo?"))) {
        await api(`/contents/${id}`, { method: "DELETE" });
        toast("Conteúdo excluído.");
        render();
      }
    }
    if (tab === "users" && act === "delete" && id !== getUserId()) {
      if (!(await confirmDialog("Excluir esta conta de usuário? Seus alertas, publicações e comentários também serão removidos."))) return;
      for (const col of ["alerts", "posts", "comments"]) {
        const items = await api(`/${col}?userId=${id}`);
        await Promise.all(items.map((i) => api(`/${col}/${i.id}`, { method: "DELETE" })));
      }
      await api(`/users/${id}`, { method: "DELETE" });
      toast("Conta excluída.");
      render();
    }
  } catch (err) {
    toast("Não foi possível concluir a operação.", "error");
  }
}

if (requireAuth(["admin"])) {
  renderSidebar("admin.html");
  el("adminTabs").addEventListener("click", (e) => {
    const t = e.target.closest("[data-tab]")?.dataset.tab;
    if (t) {
      tab = t;
      render();
    }
  });
  panel().addEventListener("click", onPanelClick);
  panel().addEventListener("change", async (e) => {
    if (e.target.dataset.act !== "role") return;
    const id = e.target.closest("[data-id]").dataset.id;
    if (id === getUserId()) return;
    try {
      await api(`/users/${id}`, { method: "PATCH", body: { role: e.target.value } });
      toast("Perfil atualizado.");
    } catch (err) {
      toast("Não foi possível alterar o perfil.", "error");
      render();
    }
  });
  el("cfCancel").addEventListener("click", () => el("contentFormModal").classList.add("hidden"));
  el("cfSave").addEventListener("click", saveContent);
  render();
}
