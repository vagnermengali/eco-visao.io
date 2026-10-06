// Conteúdos educativos (CSU04): acesso público, sem necessidade de autenticação.
let contents = [];
let category = "todos";

const el = (id) => document.getElementById(id);

function showMsg(text) {
  const m = el("learnMsg");
  m.textContent = text;
  m.classList.toggle("hidden", !text);
}

function render() {
  const cats = ["todos", ...new Set(contents.map((c) => c.category))];
  el("catTabs").innerHTML = cats
    .map(
      (c) => `<button data-cat="${esc(c)}" class="chip capitalize ${c === category ? "active" : ""}">${esc(categoryLabel(c))}</button>`
    )
    .join("");
  const list = contents.filter((c) => category === "todos" || c.category === category);
  showMsg(list.length ? "" : "Não há conteúdos disponíveis no momento.");
  el("contentList").innerHTML = list
    .map(
      (c) => `<article class="card card-hover flex flex-col">
        <span class="badge badge-${esc(c.category)} self-start mb-2" style="${["desmatamento", "queimadas", "mineracao", "fauna"].includes(c.category) ? "" : "background:#f3f4f6;color:#374151"}">${esc(categoryLabel(c.category))}</span>
        <h2 class="text-lg font-semibold text-gray-800 mb-2">${esc(c.title)}</h2>
        <p class="text-gray-600 text-sm flex-1">${esc(c.summary)}</p>
        <button data-id="${esc(c.id)}" class="mt-4 self-start text-green-700 hover:underline text-sm">Ler conteúdo <i class="fas fa-arrow-right"></i></button>
      </article>`
    )
    .join("");
}

function openContent(id) {
  const c = contents.find((x) => x.id === id);
  if (!c) return showMsg("Não foi possível acessar o conteúdo solicitado.");
  el("cmTitle").textContent = c.title;
  el("cmMeta").textContent = `${categoryLabel(c.category)} · ${formatDate(c.createdAt)}`;
  el("cmBody").textContent = c.body;
  el("contentModal").classList.remove("hidden");
}

async function load() {
  try {
    contents = await api("/contents");
    render();
  } catch (err) {
    console.error(err);
    showMsg("Ocorreu um problema ao carregar os conteúdos. ");
    const retry = document.createElement("button");
    retry.textContent = "Tentar novamente";
    retry.className = "underline";
    retry.onclick = load;
    el("learnMsg").appendChild(retry);
  }
}

if (getUserId()) {
  renderSidebar("learn.html");
} else {
  // Visitante: sem sidebar, apenas links de acesso no topo.
  el("sidebar").remove();
  el("openSidebar").remove();
  el("visitorLinks").classList.remove("hidden");
}

el("catTabs").addEventListener("click", (e) => {
  const c = e.target.closest("[data-cat]")?.dataset.cat;
  if (c) {
    category = c;
    render();
  }
});
el("contentList").addEventListener("click", (e) => {
  const id = e.target.closest("[data-id]")?.dataset.id;
  if (id) openContent(id);
});
el("cmClose").addEventListener("click", () => el("contentModal").classList.add("hidden"));
load();
