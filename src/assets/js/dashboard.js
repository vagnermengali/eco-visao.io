// Consulta de dados ambientais (CSU06) e mapa interativo (CSU07).
const CIPO_CENTER = [-19.2877, -43.5276];

let alerts = [];
let currentType = (location.hash || "").replace("#", "") || "todos";
let map = null;
let markersLayer = null;

function filtered() {
  const list = currentType === "todos" ? alerts : alerts.filter((a) => a.type === currentType);
  return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function countLast7Days(list) {
  const limit = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return list.filter((a) => new Date(a.createdAt).getTime() >= limit).length;
}

function renderTabs() {
  const tabs = [["todos", "Todos"], ...Object.entries(TYPE_CONFIG).map(([k, v]) => [k, v.label])];
  document.getElementById("typeTabs").innerHTML = tabs
    .map(
      ([key, label]) => `<button data-type="${key}" class="chip ${key === currentType ? "active" : ""}">${label}</button>`
    )
    .join("");
  document.querySelectorAll("#typeTabs button").forEach((b) =>
    b.addEventListener("click", () => {
      currentType = b.dataset.type;
      history.replaceState(null, "", `#${currentType}`);
      render();
    })
  );
}

function renderStats(list) {
  const areas = new Set(list.map((a) => `${a.lat},${a.lng}`)).size;
  const card = (title, value, hint, icon) => `
    <div class="card">
      <div class="flex items-center justify-between mb-3"><h3 class="font-medium text-gray-600 text-sm">${title}</h3><span class="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"><i class="fas ${icon}"></i></span></div>
      <p class="text-3xl font-bold text-gray-800">${value}</p><p class="text-xs text-gray-400 mt-1">${hint}</p>
    </div>`;
  document.getElementById("stats").innerHTML =
    card("Ocorrências", list.length, "Total para o filtro selecionado", "fa-bell") +
    card("Áreas monitoradas", areas, "Coordenadas distintas", "fa-location-dot") +
    card("Últimos 7 dias", countLast7Days(list), "Ocorrências recentes", "fa-clock");
}

function popupHtml(a) {
  const conf = TYPE_CONFIG[a.type];
  return `<b>${esc(a.title)}</b><br><i>${esc(conf?.label || a.type)}</i> · ${formatDate(a.createdAt)}<br>${esc(a.message)}<br>
    <small>${Number(a.lat).toFixed(4)}, ${Number(a.lng).toFixed(4)}</small>`;
}

function renderMap(list) {
  if (typeof L === "undefined") return document.getElementById("mapError").classList.remove("hidden");
  if (!map) {
    map = L.map("map").setView(CIPO_CENTER, 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
    markersLayer = L.layerGroup().addTo(map);
  }
  markersLayer.clearLayers();
  list.forEach((a) => {
    if (a.lat != null && a.lng != null) L.marker([a.lat, a.lng]).addTo(markersLayer).bindPopup(popupHtml(a));
  });
  if (list.length) map.fitBounds(L.latLngBounds(list.map((a) => [a.lat, a.lng])).pad(0.3), { maxZoom: 13 });
  document.getElementById("mapEmpty").classList.toggle("hidden", list.length > 0);
}

function renderRecent(list) {
  const el = document.getElementById("recentList");
  el.innerHTML = list.length
    ? list
        .slice(0, 5)
        .map((r) => {
          const c = TYPE_CONFIG[r.type] || {};
          return `<li class="card card-sm card-hover flex items-center gap-3 cursor-pointer" data-id="${esc(r.id)}">
            <i class="fas ${c.icon || "fa-bell"} ${c.color || "text-gray-500"}"></i>
            <div><span class="block text-sm text-gray-800">${esc(r.title)}</span>
            <span class="block text-xs text-gray-400 mt-1">${typeBadge(r.type)} · ${formatDate(r.createdAt)}</span></div></li>`;
        })
        .join("")
    : `<li>${emptyState("fa-leaf", "Nenhum dado ambiental disponível no momento.")}</li>`;
  el.querySelectorAll("li[data-id]").forEach((li) =>
    li.addEventListener("click", () => {
      const a = alerts.find((x) => x.id === li.dataset.id);
      if (a && map) {
        map.setView([a.lat, a.lng], 14);
        L.popup().setLatLng([a.lat, a.lng]).setContent(popupHtml(a)).openOn(map);
        document.getElementById("map").scrollIntoView({ behavior: "smooth" });
      }
    })
  );
}

function render() {
  const list = filtered();
  renderTabs();
  renderStats(list);
  renderMap(list);
  renderRecent(list);
}

async function load() {
  document.getElementById("mapError").classList.add("hidden");
  try {
    alerts = await api("/alerts");
    render();
  } catch (err) {
    console.error(err);
    document.getElementById("mapError").classList.remove("hidden");
  }
}

if (requireAuth()) {
  renderSidebar("dashboard.html");
  document.getElementById("retryBtn").addEventListener("click", load);
  load();
}
