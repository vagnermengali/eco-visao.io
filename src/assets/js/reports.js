// Relatório mensal (RF-003) gerado a partir das ocorrências registradas.
let alerts = [];

const el = (id) => document.getElementById(id);

function render() {
  const month = el("month").value; // AAAA-MM
  const [y, m] = month.split("-").map(Number);
  const list = alerts
    .filter((a) => {
      const d = new Date(a.createdAt);
      return d.getFullYear() === y && d.getMonth() + 1 === m;
    })
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const monthName = new Date(y, m - 1, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const byType = Object.entries(TYPE_CONFIG).map(([k, v]) => [v.label, list.filter((a) => a.type === k).length]);

  el("report").innerHTML = `
    <h2 class="text-2xl font-bold text-gray-800 capitalize">Relatório ambiental — ${esc(monthName)}</h2>
    <p class="text-sm text-gray-500 mb-6">EcoVisão · Gerado em ${formatDateTime(new Date().toISOString())}</p>
    <h3 class="font-semibold mb-2">Resumo por tipo de ocorrência</h3>
    <table class="w-full text-sm mb-6"><thead><tr class="text-left border-b"><th class="py-2">Tipo</th><th class="py-2">Ocorrências</th></tr></thead>
      <tbody>${byType.map(([l, n]) => `<tr class="border-b"><td class="py-2">${esc(l)}</td><td class="py-2">${n}</td></tr>`).join("")}
      <tr class="font-semibold"><td class="py-2">Total</td><td class="py-2">${list.length}</td></tr></tbody></table>
    <h3 class="font-semibold mb-2">Ocorrências do período</h3>
    ${
      list.length
        ? `<ul class="space-y-2 text-sm">${list
            .map(
              (a) => `<li class="border rounded-lg p-3"><b>${esc(a.title)}</b> — ${esc(TYPE_CONFIG[a.type]?.label || a.type)} · ${formatDate(a.createdAt)}<br>
              <span class="text-gray-600">${esc(a.message)}</span><br><span class="text-xs text-gray-400">${Number(a.lat).toFixed(4)}, ${Number(a.lng).toFixed(4)}</span></li>`
            )
            .join("")}</ul>`
        : `<p class="text-gray-500">Nenhuma ocorrência registrada neste mês.</p>`
    }`;
}

async function load() {
  try {
    alerts = await api("/alerts");
    render();
  } catch (err) {
    console.error(err);
    el("report").innerHTML = `<p class="text-red-600">Não foi possível carregar os dados do relatório.</p>`;
  }
}

if (requireAuth()) {
  renderSidebar("reports.html");
  el("month").value = new Date().toISOString().slice(0, 7);
  el("month").addEventListener("change", () => el("month").value && render());
  el("printBtn").addEventListener("click", () => window.print());
  load();
}
