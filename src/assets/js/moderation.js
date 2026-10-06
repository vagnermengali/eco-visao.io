// Moderação de conteúdos (CSU10): consultar, analisar e remover conteúdos inadequados.
const SOURCES = {
  posts: { path: "/posts", label: (i) => i.title, text: (i) => i.content },
  comments: { path: "/comments", label: () => "Comentário", text: (i) => i.content },
  alerts: { path: "/alerts", label: (i) => i.title, text: (i) => i.message },
};

let tab = "posts";
let users = {};

const el = (id) => document.getElementById(id);

function setMsg(text) {
  el("modMsg").textContent = text;
  el("modMsg").classList.toggle("hidden", !text);
}

async function render() {
  document.querySelectorAll("#modTabs button").forEach((b) => {
    const on = b.dataset.tab === tab;
    b.className = `chip ${on ? "active" : ""}`;
  });
  const src = SOURCES[tab];
  try {
    const items = (await api(src.path)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setMsg(items.length ? "" : "Não há conteúdos disponíveis para moderação no momento.");
    el("modList").innerHTML = items
      .map((i) => {
        const u = users[i.userId];
        return `<div class="card card-sm flex justify-between gap-4" data-id="${esc(i.id)}">
          <div class="min-w-0"><p class="font-medium text-gray-800">${esc(src.label(i))}</p>
          <p class="text-sm text-gray-600 whitespace-pre-line">${esc(src.text(i))}</p>
          <p class="text-xs text-gray-400 mt-1">${u ? esc(`${u.firstName} ${u.lastName}`) : "Usuário removido"} · ${formatDateTime(i.createdAt)}</p></div>
          <button data-act="remove" class="self-start btn btn-danger btn-sm shrink-0"><i class="fas fa-trash"></i> Remover</button>
        </div>`;
      })
      .join("");
  } catch (err) {
    console.error(err);
    setMsg("Não foi possível carregar os conteúdos. Tente novamente.");
    el("modList").innerHTML = "";
  }
}

async function remove(id) {
  if (!["moderator", "admin"].includes(getRole())) return toast("Permissão insuficiente para realizar a operação.", "error");
  if (!(await confirmDialog("Confirma a remoção deste conteúdo? A ação não pode ser desfeita."))) return;
  try {
    if (tab === "posts") {
      const cs = await api(`/comments?postId=${id}`);
      await Promise.all(cs.map((c) => api(`/comments/${c.id}`, { method: "DELETE" })));
    }
    await api(`${SOURCES[tab].path}/${id}`, { method: "DELETE" });
    toast("Conteúdo removido.");
    render();
  } catch (err) {
    toast("Não foi possível remover o conteúdo.", "error");
  }
}

if (requireAuth(["moderator", "admin"])) {
  renderSidebar("moderation.html");
  api("/users").then((list) => {
    users = Object.fromEntries(list.map((u) => [u.id, u]));
    render();
  }).catch(() => render());
  el("modTabs").addEventListener("click", (e) => {
    const t = e.target.closest("[data-tab]")?.dataset.tab;
    if (t) {
      tab = t;
      render();
    }
  });
  el("modList").addEventListener("click", (e) => {
    const row = e.target.closest("[data-id]");
    if (e.target.closest("[data-act=remove]") && row) remove(row.dataset.id);
  });
}
