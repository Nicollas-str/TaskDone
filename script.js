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

document.addEventListener('DOMContentLoaded', function() {
    const passosContainer = document.getElementById('passos-container');
    const adicionarPassoBtn = document.getElementById('adicionar-passo');
    const formTask = document.getElementById('form-task');

    function getPassoCount() {
        return passosContainer.querySelectorAll('.passo').length;
    }

    if (adicionarPassoBtn) {
        adicionarPassoBtn.addEventListener('click', function() {
            const passoCount = getPassoCount() + 1;
            const div = document.createElement('div');
            div.className = 'passo';
            div.innerHTML = `
                <input type="text" name="passos[]" placeholder="Task ${passoCount}" required>
                <button type="button" class="remover-passo">Remover</button>
            `;
            passosContainer.insertBefore(div, adicionarPassoBtn);

            div.querySelector('.remover-passo').onclick = function() {
                div.remove();
            };
        });

        // Permite remover o primeiro passo também
        passosContainer.querySelectorAll('.remover-passo').forEach(btn => {
            btn.onclick = function() {
                btn.parentElement.remove();
            };
        });
    }

    // Salvar task no localStorage
    if (formTask) {
        formTask.addEventListener('submit', function(event) {
            event.preventDefault();

            // Pega objetivo e data
            const objetivo = document.getElementById('objetivo') ? document.getElementById('objetivo').value : '';
            const dataEntrega = document.getElementById('dataEntrega') ? document.getElementById('dataEntrega').value : '';

            // Pega participantes
            const participantes = [];
            document.querySelectorAll('#participantes-checkboxes input[type="checkbox"]:checked').forEach(cb => {
                participantes.push(cb.value);
            });

            // Pega passos
            const passos = [];
            passosContainer.querySelectorAll('input[name="passos[]"]').forEach(input => {
                passos.push(input.value);
            });

            // Monta objeto da task
            const novaTask = {
                objetivo,
                dataEntrega,
                participantes,
                passos
            };

            // Salva no localStorage
            let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(novaTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            alert('Task salva com sucesso!');
            formTask.reset();

            // Remove passos extras (deixa só o primeiro)
            passosContainer.querySelectorAll('.passo').forEach((div, idx) => {
                if (idx > 0) div.remove();
            });
        });
    }
});