// Gerenciamento de alertas ambientais (CSU08): cadastrar, consultar, atualizar e excluir.
const CIPO_CENTER = [-19.2877, -43.5276];

let map;
let markers = {};
let alerts = [];
let editingId = null;
let pickedLatLng = null;
let picking = false;

const modal = document.getElementById("caixaModal");
const el = (id) => document.getElementById(id);

function showModalError(msg) {
  const box = el("modalError");
  box.textContent = msg;
  box.className = msg ? "alert-error mb-3" : "hidden";
}

function popupHtml(a) {
  return `<b>${esc(a.title)}</b><br>${esc(TYPE_CONFIG[a.type]?.label || a.type)} · ${formatDate(a.createdAt)}<br>${esc(a.message)}`;
}

function initMap() {
  map = L.map("map").setView(CIPO_CENTER, 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  map.on("click", (e) => {
    if (!picking) return;
    picking = false;
    pickedLatLng = e.latlng;
    el("entradaLocal").textContent = `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;
    document.getElementById("map").style.cursor = "";
    modal.classList.remove("hidden");
  });
}

function renderMarkers() {
  Object.values(markers).forEach((m) => map.removeLayer(m));
  markers = {};
  alerts.forEach((a) => {
    markers[a.id] = L.marker([a.lat, a.lng]).addTo(map).bindPopup(popupHtml(a));
  });
}

function renderList() {
  const mine = alerts
    .filter((a) => canModify(a.userId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const lista = el("listaAlertas");
  if (!mine.length) {
    lista.innerHTML = `${emptyState("fa-bell-slash", "Nenhum alerta criado ainda. Clique em “Novo Alerta” para registrar uma ocorrência.")}`;
    return;
  }
  lista.innerHTML = mine
    .map((a) => {
      const c = TYPE_CONFIG[a.type] || {};
      return `<div class="card card-sm card-hover flex justify-between items-start gap-4" data-id="${esc(a.id)}">
        <div class="cursor-pointer" data-act="view">
          <p class="text-gray-800 font-medium">${esc(a.title)}</p>
          <p class="text-gray-600 text-sm mb-1">${esc(a.message)}</p>
          <p class="text-gray-500 text-xs mt-1">${typeBadge(a.type)} · ${formatDate(a.createdAt)} · ${Number(a.lat).toFixed(4)}, ${Number(a.lng).toFixed(4)}</p>
        </div>
        <div class="flex gap-2 shrink-0">
          <button data-act="edit" class="btn btn-info btn-sm"><i class="fas fa-edit"></i> Editar</button>
          <button data-act="delete" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> Excluir</button>
        </div></div>`;
    })
    .join("");
}

function refresh() {
  renderList();
  renderMarkers();
}

async function load() {
  try {
    alerts = await api("/alerts");
    refresh();
  } catch (err) {
    console.error(err);
    el("listaAlertas").innerHTML = `<div class="alert-error">Não foi possível carregar os alertas. <button id="retry" class="underline font-medium">Tentar novamente</button></div>`;
    el("retry").addEventListener("click", load);
  }
}

function openModal(alert) {
  editingId = alert?.id || null;
  showModalError("");
  el("tituloModal").textContent = alert ? "Editar Alerta" : "Novo Alerta";
  el("entradaTipo").value = alert?.type || "desmatamento";
  el("entradaTitulo").value = alert?.title || "";
  el("entradaDescricao").value = alert?.message || "";
  el("entradaData").value = (alert?.createdAt || new Date().toISOString()).slice(0, 10);
  el("entradaData").max = new Date().toISOString().slice(0, 10);
  pickedLatLng = alert ? { lat: alert.lat, lng: alert.lng } : null;
  el("entradaLocal").textContent = alert ? `${alert.lat.toFixed(4)}, ${alert.lng.toFixed(4)}` : "não definida";
  modal.classList.remove("hidden");
}

async function saveAlert() {
  const title = el("entradaTitulo").value.trim();
  const message = el("entradaDescricao").value.trim();
  const type = el("entradaTipo").value;
  const date = el("entradaData").value;
  if (!title) return showModalError("Informe um título para o alerta.");
  if (!message) return showModalError("Informe uma breve descrição.");
  if (!date) return showModalError("Informe a data da ocorrência.");
  if (!pickedLatLng) return showModalError("Escolha a localização no mapa.");

  const data = { type, title, message, lat: pickedLatLng.lat, lng: pickedLatLng.lng, createdAt: new Date(date + "T12:00:00").toISOString() };
  try {
    if (editingId) {
      const current = alerts.find((a) => a.id === editingId);
      if (!current || !canModify(current.userId)) return showModalError("Você não tem autorização para modificar este alerta.");
      await api(`/alerts/${editingId}`, { method: "PATCH", body: data });
      toast("Alerta atualizado com sucesso.");
    } else {
      await api("/alerts", { method: "POST", body: { id: newId(), userId: getUserId(), ...data } });
      toast("Alerta cadastrado com sucesso.");
    }
    modal.classList.add("hidden");
    await load();
  } catch (err) {
    console.error(err);
    showModalError("Não foi possível salvar o alerta. Tente novamente.");
  }
}

async function deleteAlert(id) {
  const current = alerts.find((a) => a.id === id);
  if (!current || !canModify(current.userId)) return toast("Você não tem autorização para excluir este alerta.", "error");
  if (!(await confirmDialog("Deseja realmente excluir este alerta?"))) return;
  try {
    await api(`/alerts/${id}`, { method: "DELETE" });
    toast("Alerta excluído.");
    await load();
  } catch (err) {
    toast("Não foi possível excluir o alerta.", "error");
  }
}

if (requireAuth()) {
  renderSidebar("my-alerts.html");
  if (getRole() === "admin") el("listTitle").textContent = "Todos os Alertas (administrador)";
  initMap();
  load();

  el("novoAlerta").addEventListener("click", () => openModal());
  el("cancelarModal").addEventListener("click", () => modal.classList.add("hidden"));
  el("confirmarModal").addEventListener("click", saveAlert);
  el("escolherLocal").addEventListener("click", () => {
    picking = true;
    modal.classList.add("hidden");
    document.getElementById("map").style.cursor = "crosshair";
    document.getElementById("map").scrollIntoView({ behavior: "smooth" });
    toast("Clique no mapa para escolher a localização.");
  });
  el("listaAlertas").addEventListener("click", (e) => {
    const row = e.target.closest("[data-id]");
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (!row || !act) return;
    const a = alerts.find((x) => x.id === row.dataset.id);
    if (act === "edit") openModal(a);
    if (act === "delete") deleteAlert(a.id);
    if (act === "view" && markers[a.id]) {
      map.setView([a.lat, a.lng], 14);
      markers[a.id].openPopup();
      document.getElementById("map").scrollIntoView({ behavior: "smooth" });
    }
  });
}
