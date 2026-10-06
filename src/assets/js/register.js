const avatarInput = document.getElementById("avatarInput");
const avatarPreview = document.getElementById("avatarPreview");
const avatarPlaceholder = document.getElementById("avatarPlaceholder");

avatarInput.addEventListener("change", () => {
  const file = avatarInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      avatarPreview.src = reader.result;
      avatarPreview.classList.remove("hidden");
      avatarPlaceholder.classList.add("hidden");
    };
    reader.readAsDataURL(file);
  }
});

const registerForm = document.getElementById("registerForm");
const errorMsg = document.getElementById("errorMsg");
const errorText = document.getElementById("errorText");
const successMsg = document.getElementById("successMsg");

function showError(msg) {
  errorText.textContent = msg;
  errorMsg.classList.remove("hidden");
  successMsg.classList.add("hidden");
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const address = document.getElementById("address").value.trim();
  const birthdate = document.getElementById("birthdate").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const avatar = avatarPreview.classList.contains("hidden") ? "" : avatarPreview.src;

  if (!firstName || !lastName || !email || !password) return showError("Preencha todos os campos obrigatórios.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError("Informe um e-mail válido.");
  if (password.length < 6) return showError("A senha deve ter no mínimo 6 caracteres.");
  if (password !== confirmPassword) return showError("As senhas não coincidem.");

  try {
    const existing = await api(`/users?email=${encodeURIComponent(email)}`);
    if (existing.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return showError("Este e-mail já está cadastrado. Informe outro ou acesse o login.");
    }
  } catch (err) {
    return showError("Não foi possível conectar ao servidor. Tente novamente.");
  }

  const newUser = { firstName, lastName, email, cpf, address, birthdate, password, avatar, role: "user" };

  try {
    await api("/users", { method: "POST", body: newUser });

    errorMsg.classList.add("hidden");
    successMsg.classList.remove("hidden");

    registerForm.reset();
    avatarPreview.classList.add("hidden");
    avatarPlaceholder.classList.remove("hidden");

    setTimeout(() => (window.location.href = "login.html"), 1200);
  } catch (err) {
    showError("Erro ao cadastrar. Tente novamente.");
  }
});
