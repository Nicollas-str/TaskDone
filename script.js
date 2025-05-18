// Função para verificar login
function verificarLogin(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Captura os valores dos campos do formulário de login
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Recupera os usuários armazenados no localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o usuário e senha correspondem a algum usuário cadastrado
    const usuarioValido = users.find(user => user.username === username && user.password === password);

    if (usuarioValido) {
        alert('Login bem-sucedido!');
        window.location.href = 'pages/alltasks.html';
    } else {
        alert('Nome ou senha incorretos. Tente novamente.');
    }
}

// Adiciona o evento ao formulário de login
const loginForm = document.getElementById('login');
if (loginForm) {
    loginForm.addEventListener('submit', verificarLogin);
}

// Função para cadastrar usuários
function cadastrarUsuario(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Captura os valores dos campos do formulário
    const username = document.getElementById('new-username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('new-password').value;
    const repeatPassword = document.getElementById('repeat-password').value;

    // Verifica se as senhas coincidem
    if (password !== repeatPassword) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    // Recupera os usuários existentes no localStorage ou inicializa um array vazio
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Adiciona o novo usuário ao array
    users.push({ username, email, password });

    // Salva o array atualizado no localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Exibe uma mensagem de sucesso e limpa o formulário
    alert('Usuário cadastrado com sucesso!');
    event.target.reset();
}

// Adiciona o evento ao formulário de cadastro
const cadastroForm = document.getElementById('cadastro');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', cadastrarUsuario);
}
