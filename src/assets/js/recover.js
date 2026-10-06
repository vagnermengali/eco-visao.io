// Recuperação de senha (CSU03). Sem servidor de e-mail: o link de redefinição é
// gerado e exibido na tela, simulando o envio. Um servidor real enviaria por e-mail.
const form = document.getElementById("recoverForm");
const msg = document.getElementById("recoverMsg");
const token = new URLSearchParams(location.search).get("token");
const TOKEN_TTL_MS = 30 * 60 * 1000;

function show(text, ok = false) {
  msg.textContent = text;
  msg.className = `text-sm rounded-lg px-3 py-2 ${ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`;
}

function inputHtml(id, label, type = "password") {
  return `<div><label for="${id}" class="block text-sm font-medium text-gray-700 mb-1">${label}</label>
    <input id="${id}" type="${type}" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"></div>`;
}

async function findByToken() {
  const users = await api(`/users?resetToken=${encodeURIComponent(token)}`);
  return users[0];
}

async function requestReset(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return show("Informe um e-mail válido.");
  try {
    const users = await api(`/users?email=${encodeURIComponent(email)}`);
    const user = users.find((u) => u.email.toLowerCase() === email);
    if (!user) return show("Não foi possível localizar uma conta associada ao e-mail informado.");
    const resetToken = newId() + newId();
    await api(`/users/${user.id}`, {
      method: "PATCH",
      body: { resetToken, resetExpires: Date.now() + TOKEN_TTL_MS },
    });
    const link = `${location.pathname}?token=${resetToken}`;
    show("Link de redefinição gerado (válido por 30 minutos).", true);
    msg.insertAdjacentHTML("beforeend", ` <a class="underline font-medium" href="${link}">Redefinir senha</a>`);
  } catch (err) {
    show("Não foi possível processar a solicitação. Tente novamente.");
  }
}

async function resetPassword(e) {
  e.preventDefault();
  const password = document.getElementById("newPassword").value;
  const confirm = document.getElementById("confirmPassword").value;
  if (password.length < 6) return show("A senha deve ter no mínimo 6 caracteres.");
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) return show("A senha deve conter letras e números.");
  if (password !== confirm) return show("As senhas não coincidem.");
  try {
    const user = await findByToken();
    if (!user || user.resetExpires < Date.now()) return show("Link inválido ou expirado. Solicite um novo link.");
    await api(`/users/${user.id}`, { method: "PATCH", body: { password, resetToken: null, resetExpires: null } });
    show("Senha alterada com sucesso! Redirecionando para o login...", true);
    setTimeout(() => (location.href = "login.html"), 1500);
  } catch (err) {
    show("Não foi possível alterar a senha. Tente novamente.");
  }
}

if (token) {
  document.querySelector("h1").textContent = "Nova Senha";
  document.querySelector("h1 + p").textContent = "Defina uma nova senha para sua conta";
  form.querySelector("div").outerHTML = inputHtml("newPassword", "Nova senha") + inputHtml("confirmPassword", "Confirmar nova senha");
  form.querySelector("button[type=submit]").textContent = "Alterar senha";
  form.addEventListener("submit", resetPassword);
  findByToken().then((u) => {
    if (!u || u.resetExpires < Date.now()) show("Link inválido ou expirado. Solicite um novo link.");
  });
} else {
  form.addEventListener("submit", requestReset);
}
