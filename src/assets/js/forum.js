// Fórum de discussão (CSU09): consultar, criar/editar/excluir publicações e comentar.
let posts = [];
let comments = [];
let users = {};
let openPosts = new Set();

const el = (id) => document.getElementById(id);
const authorName = (id) => (users[id] ? `${users[id].firstName} ${users[id].lastName}` : "Usuário removido");

function showError(msg) {
  const box = el("postError");
  box.textContent = msg;
  box.className = msg ? "alert-error mb-3" : "hidden";
}

function commentHtml(c) {
  const own = canModify(c.userId);
  return `<div class="border-l-2 border-green-200 pl-3 py-1" data-comment="${esc(c.id)}">
    <p class="text-sm text-gray-800 whitespace-pre-line">${esc(c.content)}</p>
    <p class="text-xs text-gray-400">${esc(authorName(c.userId))} · ${formatDateTime(c.createdAt)}
    ${own ? `<button data-act="del-comment" class="ml-2 text-red-600 hover:underline">excluir</button>` : ""}</p></div>`;
}

function postHtml(p) {
  const own = canModify(p.userId);
  const list = comments.filter((c) => c.postId === p.id).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const open = openPosts.has(p.id);
  return `<article class="card card-sm card-hover" data-post="${esc(p.id)}">
    <div class="flex justify-between items-start gap-4">
      <div class="min-w-0">
        <h3 class="text-lg font-semibold text-gray-800 mb-1">${esc(p.title)}</h3>
        <p class="text-gray-700 whitespace-pre-line">${esc(p.content)}</p>
        <div class="text-sm text-gray-400 mt-2"><i class="far fa-clock"></i> ${formatDateTime(p.createdAt)} · por ${esc(authorName(p.userId))}</div>
      </div>
      ${own ? `<div class="flex gap-3 shrink-0">
        <button data-act="edit" class="text-blue-600 hover:text-blue-800" aria-label="Editar"><i class="fas fa-edit"></i></button>
        <button data-act="delete" class="text-red-600 hover:text-red-800" aria-label="Excluir"><i class="fas fa-trash"></i></button></div>` : ""}
    </div>
    <button data-act="toggle" class="mt-3 text-sm text-green-700 hover:underline"><i class="far fa-comments"></i> ${list.length} comentário(s)</button>
    <div class="${open ? "" : "hidden"} mt-3 space-y-3" data-box>
      ${list.map(commentHtml).join("") || `<p class="text-sm text-gray-400">Seja o primeiro a comentar.</p>`}
      <div class="flex gap-2 pt-2">
        <input data-new-comment maxlength="500" placeholder="Escreva um comentário..." class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
        <button data-act="comment" class="btn btn-primary btn-sm">Comentar</button>
      </div>
    </div></article>`;
}

function render() {
  const sorted = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const msg = el("forumMsg");
  msg.innerHTML = emptyState("fa-comments", "Não há discussões disponíveis no momento. Crie a primeira!");
  msg.classList.toggle("hidden", sorted.length > 0);
  el("topicsList").innerHTML = sorted.map(postHtml).join("");
}

async function load() {
  try {
    const [p, c, u] = await Promise.all([api("/posts"), api("/comments"), api("/users")]);
    posts = p;
    comments = c;
    users = Object.fromEntries(u.map((x) => [x.id, x]));
    render();
  } catch (err) {
    console.error(err);
    const msg = el("forumMsg");
    msg.textContent = "Não foi possível carregar o fórum. Verifique a conexão com o servidor.";
    msg.classList.remove("hidden");
  }
}

async function addPost() {
  const title = el("postTitle").value.trim();
  const content = el("postContent").value.trim();
  if (!title || !content) return showError("Preencha título e conteúdo.");
  showError("");
  try {
    await api("/posts", { method: "POST", body: { id: newId(), userId: getUserId(), title, content, createdAt: new Date().toISOString() } });
    el("postTitle").value = "";
    el("postContent").value = "";
    toast("Discussão publicada.");
    await load();
  } catch (err) {
    showError("Não foi possível publicar. Tente novamente.");
  }
}

async function editPost(p) {
  const title = prompt("Editar título", p.title)?.trim();
  if (!title) return;
  const content = prompt("Editar conteúdo", p.content)?.trim();
  if (!content) return;
  try {
    await api(`/posts/${p.id}`, { method: "PATCH", body: { title, content } });
    toast("Publicação atualizada.");
    await load();
  } catch (err) {
    toast("Não foi possível atualizar a publicação.", "error");
  }
}

async function deletePost(p) {
  if (!(await confirmDialog("Excluir esta publicação e seus comentários?"))) return;
  try {
    await Promise.all(comments.filter((c) => c.postId === p.id).map((c) => api(`/comments/${c.id}`, { method: "DELETE" })));
    await api(`/posts/${p.id}`, { method: "DELETE" });
    toast("Publicação excluída.");
    await load();
  } catch (err) {
    toast("Não foi possível excluir a publicação.", "error");
  }
}

async function addComment(postId, input) {
  const content = input.value.trim();
  if (!content) return toast("Escreva um comentário antes de enviar.", "error");
  try {
    await api("/comments", { method: "POST", body: { id: newId(), postId, userId: getUserId(), content, createdAt: new Date().toISOString() } });
    openPosts.add(postId);
    await load();
  } catch (err) {
    toast("Não foi possível publicar o comentário.", "error");
  }
}

if (requireAuth()) {
  renderSidebar("forum.html");
  el("confirmPost").addEventListener("click", addPost);
  el("topicsList").addEventListener("click", async (e) => {
    const act = e.target.closest("[data-act]")?.dataset.act;
    const card = e.target.closest("[data-post]");
    if (!act || !card) return;
    const p = posts.find((x) => x.id === card.dataset.post);
    if (act === "toggle") {
      card.querySelector("[data-box]").classList.toggle("hidden");
      openPosts.has(p.id) ? openPosts.delete(p.id) : openPosts.add(p.id);
    }
    if (act === "edit" && canModify(p.userId)) editPost(p);
    if (act === "delete" && canModify(p.userId)) deletePost(p);
    if (act === "comment") addComment(p.id, card.querySelector("[data-new-comment]"));
    if (act === "del-comment") {
      const c = comments.find((x) => x.id === e.target.closest("[data-comment]").dataset.comment);
      if (c && canModify(c.userId) && (await confirmDialog("Excluir este comentário?"))) {
        await api(`/comments/${c.id}`, { method: "DELETE" });
        openPosts.add(p.id);
        load();
      }
    }
  });
  load();
}
