document.addEventListener('DOMContentLoaded', function () {
  if (!requireAuth()) return;
  let currentUser = null;

  const form = document.getElementById('profileForm');
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const cpf = document.getElementById('cpf');
  const endereco = document.getElementById('endereco');
  const dataNascimento = document.getElementById('dataNascimento');
  const currentPassword = document.getElementById('currentPassword');
  const newPassword = document.getElementById('newPassword');
  const confirmPassword = document.getElementById('confirmPassword');
  const imageUpload = document.getElementById('imageUpload');
  const profileImg = document.getElementById('profileImg');
  const profilePlaceholder = document.getElementById('profilePlaceholder');
  const successMsg = document.getElementById('successMsg');
  const cancelBtn = document.getElementById('cancelBtn');

  loadProfile();

  cpf.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }

    e.target.value = value;
  });

  imageUpload.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showError(imageUpload, 'Por favor, selecione uma imagem válida');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showError(imageUpload, 'A imagem deve ter no máximo 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        profileImg.src = e.target.result;
        profileImg.classList.remove('hidden');
        profilePlaceholder.classList.add('hidden');
      };
      reader.readAsDataURL(file);
    }
  });

  firstName.addEventListener('blur', () => validateFirstName());
  lastName.addEventListener('blur', () => validateLastName());
  email.addEventListener('blur', () => validateEmail());
  cpf.addEventListener('blur', () => validateCPF());
  endereco.addEventListener('blur', () => validateEndereco());
  dataNascimento.addEventListener('blur', () => validateDataNascimento());
  newPassword.addEventListener('input', () => validateNewPassword());
  confirmPassword.addEventListener('input', () => validateConfirmPassword());

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    clearAllErrors();
    successMsg.classList.add('hidden');

    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isCPFValid = validateCPF();
    const isEnderecoValid = validateEndereco();
    const isDataNascimentoValid = validateDataNascimento();
    const isPasswordValid = validatePasswords();

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isCPFValid &&
      isEnderecoValid &&
      isDataNascimentoValid &&
      isPasswordValid
    ) {
      saveProfile().catch(() => showError(email, 'Não foi possível salvar as alterações. Tente novamente.'));
    } else {
      const firstError = document.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  cancelBtn.addEventListener('click', function () {
    window.location.href = './dashboard.html';
  });

  function validateFirstName() {
    const value = firstName.value.trim();

    if (value === '') {
      clearError(firstName);
      return true;
    }

    if (value.length < 2) {
      showError(firstName, 'O primeiro nome deve ter pelo menos 2 caracteres');
      return false;
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
      showError(firstName, 'O primeiro nome deve conter apenas letras');
      return false;
    }
    clearError(firstName);
    return true;
  }

  function validateLastName() {
    const value = lastName.value.trim();

    if (value === '') {
      clearError(lastName);
      return true;
    }

    if (value.length < 2) {
      showError(lastName, 'O sobrenome deve ter pelo menos 2 caracteres');
      return false;
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
      showError(lastName, 'O sobrenome deve conter apenas letras');
      return false;
    }
    clearError(lastName);
    return true;
  }

  function validateEmail() {
    const value = email.value.trim();

    // Campo opcional - se vazio, é válido
    if (value === '') {
      clearError(email);
      return true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(email, 'Por favor, insira um email válido');
      return false;
    }
    clearError(email);
    return true;
  }

  function validateCPF() {
    const value = cpf.value.replace(/\D/g, '');

    if (value === '') {
      clearError(cpf);
      return true;
    }

    if (value.length !== 11) {
      showError(cpf, 'O CPF deve ter 11 dígitos');
      return false;
    }

    if (/^(\d)\1{10}$/.test(value)) {
      showError(cpf, 'CPF inválido');
      return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(value.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(value.substring(9, 10))) {
      showError(cpf, 'CPF inválido');
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(value.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(value.substring(10, 11))) {
      showError(cpf, 'CPF inválido');
      return false;
    }

    clearError(cpf);
    return true;
  }

  function validateEndereco() {
    const value = endereco.value.trim();

    // Campo opcional - se vazio, é válido
    if (value === '') {
      clearError(endereco);
      return true;
    }

    // Se preenchido, valida o tamanho mínimo
    if (value.length < 5) {
      showError(endereco, 'O endereço deve ter pelo menos 5 caracteres');
      return false;
    }
    clearError(endereco);
    return true;
  }

  function validateDataNascimento() {
    const value = dataNascimento.value;

    // Campo opcional - se vazio, é válido
    if (value === '') {
      clearError(dataNascimento);
      return true;
    }

    // Se preenchido, valida a idade
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      showError(dataNascimento, 'Você deve ter pelo menos 18 anos');
      return false;
    }

    if (age > 120) {
      showError(dataNascimento, 'Por favor, insira uma data válida');
      return false;
    }

    clearError(dataNascimento);
    return true;
  }

  function validateNewPassword() {
    const value = newPassword.value;

    // Se não há senha atual e nem nova senha, campo é opcional
    if (!currentPassword.value && !value) {
      clearError(newPassword);
      return true;
    }

    // Se preencheu senha atual mas não a nova, exigir nova senha
    if (currentPassword.value && !value) {
      showError(newPassword, 'A nova senha é obrigatória');
      return false;
    }

    // Se preencheu nova senha, validar formato
    if (value && value.length < 6) {
      showError(newPassword, 'A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (value && (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value))) {
      showError(newPassword, 'A senha deve conter letras e números');
      return false;
    }

    clearError(newPassword);
    return true;
  }

  function validateConfirmPassword() {
    const value = confirmPassword.value;
    const newPasswordValue = newPassword.value;

    // Se não há senha atual e nem confirmação, campo é opcional
    if (!currentPassword.value && !value) {
      clearError(confirmPassword);
      return true;
    }

    // Se preencheu nova senha, validar se confirmação coincide
    if (value !== newPasswordValue) {
      showError(confirmPassword, 'As senhas não coincidem');
      return false;
    }

    clearError(confirmPassword);
    return true;
  }

  function validatePasswords() {
    const storedPassword = currentUser ? currentUser.password : null;

    if (currentPassword.value) {
      if (storedPassword && currentPassword.value !== storedPassword) {
        showError(currentPassword, 'Senha atual incorreta');
        return false;
      }

      const isNewPasswordValid = validateNewPassword();
      const isConfirmPasswordValid = validateConfirmPassword();

      return isNewPasswordValid && isConfirmPasswordValid;
    } else {
      if (newPassword.value || confirmPassword.value) {
        if (storedPassword) {
          showError(currentPassword, 'Digite a senha atual para alterá-la');
          return false;
        }
      }
    }

    clearError(currentPassword);
    return true;
  }

  function showError(element, message) {
    element.classList.add('border-red-500', 'focus:ring-red-400');
    element.classList.remove('border-gray-300', 'focus:ring-green-400');

    const existingError = element.parentElement.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-xs mt-1';
    errorDiv.textContent = message;
    element.parentElement.parentElement.appendChild(errorDiv);
  }

  function clearError(element) {
    element.classList.remove('border-red-500', 'focus:ring-red-400');
    element.classList.add('border-gray-300', 'focus:ring-green-400');

    const errorMessage = element.parentElement.parentElement.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  function clearAllErrors() {
    const allInputs = form.querySelectorAll('input');
    allInputs.forEach(input => clearError(input));
  }

  async function saveProfile() {
    const newEmail = email.value.trim();
    if (newEmail && newEmail.toLowerCase() !== currentUser.email.toLowerCase()) {
      const same = await api('/users?email=' + encodeURIComponent(newEmail));
      if (same.some((u) => u.id !== currentUser.id && u.email.toLowerCase() === newEmail.toLowerCase())) {
        showError(email, 'Este e-mail já está cadastrado em outra conta');
        return;
      }
    }

    const changes = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: newEmail,
      cpf: cpf.value,
      address: endereco.value.trim(),
      birthdate: dataNascimento.value,
      avatar: profileImg.classList.contains('hidden') ? '' : profileImg.src
    };
    if (newPassword.value) changes.password = newPassword.value;

    currentUser = await api('/users/' + currentUser.id, { method: 'PATCH', body: changes });

    successMsg.classList.remove('hidden');
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';

    setTimeout(() => {
      successMsg.classList.add('hidden');
    }, 3000);
  }

  async function loadProfile() {
    try {
      currentUser = await api('/users/' + getUserId());
    } catch (err) {
      console.error(err);
      showError(firstName, 'Não foi possível carregar o perfil.');
      return;
    }
    firstName.value = currentUser.firstName || '';
    lastName.value = currentUser.lastName || '';
    email.value = currentUser.email || '';
    cpf.value = currentUser.cpf || '';
    endereco.value = currentUser.address || '';
    dataNascimento.value = currentUser.birthdate || '';

    if (currentUser.avatar) {
      profileImg.onerror = () => {
        profileImg.classList.add('hidden');
        profilePlaceholder.classList.remove('hidden');
      };
      profileImg.src = currentUser.avatar;
      profileImg.classList.remove('hidden');
      profilePlaceholder.classList.add('hidden');
    }
  }
});
