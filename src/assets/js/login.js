const form = document.getElementById("loginForm");
const formAlert = document.getElementById("formAlert");

function showFormError(msg) {
  formAlert.textContent = msg;
  formAlert.classList.remove("hidden");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formAlert.classList.add("hidden");

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  if (!email || !password) return showFormError("Preencha o e-mail e a senha.");

  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
  try {
    const users = await api(`/users?email=${encodeURIComponent(email)}`);
    const user = users.find((u) => u.email.toLowerCase() === email && u.password === password);
    if (!user) return showFormError("E-mail ou senha inválidos.");
    setSession(user);
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    showFormError("Não foi possível conectar ao servidor. Tente novamente.");
  } finally {
    btn.disabled = false;
    btn.textContent = "Entrar";
  }
});
