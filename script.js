// TaskDone - script.js
// =============================================
// 1. LOGIN E CADASTRO DE USUÁRIOS
// =============================================

// Função para verificar login
function verificarLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const usuarioValido = users.find(user => user.username === username && user.password === password);

    if (usuarioValido) {
        alert('Login bem-sucedido!');
        window.location.href = 'pages/alltasks.html';
    } else {
        alert('Nome ou senha incorretos. Tente novamente.');
    }
}

// Evento no formulário de login
const loginForm = document.getElementById('login');
if (loginForm) {
    loginForm.addEventListener('submit', verificarLogin);
}

// Função para cadastrar usuário
function cadastrarUsuario(event) {
    event.preventDefault();

    const username = document.getElementById('new-username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('new-password').value;
    const repeatPassword = document.getElementById('repeat-password').value;

    if (password !== repeatPassword) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuário cadastrado com sucesso!');
    event.target.reset();
}

// Evento no formulário de cadastro
const cadastroForm = document.getElementById('cadastro');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', cadastrarUsuario);
}

// =============================================
// 2. FORMULÁRIO DE TASK: PARTICIPANTES, PASSOS, SALVAR
// =============================================

document.addEventListener('DOMContentLoaded', function () {
    const passosContainer = document.getElementById('passos-container');
    const adicionarPassoBtn = document.getElementById('adicionar-passo');
    const formTask = document.getElementById('form-task');

    const participantesContainer = document.getElementById('participantes-checkboxes');
    if (participantesContainer) {
        participantesContainer.innerHTML = '';
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" name="participantes[]" value="${user.username}"> ${user.username}`;
            participantesContainer.appendChild(label);
            participantesContainer.appendChild(document.createElement('br'));
        });
    }

    function getPassoCount() {
        return passosContainer.querySelectorAll('.passo').length;
    }

    if (adicionarPassoBtn) {
        adicionarPassoBtn.addEventListener('click', function () {
            const passoCount = getPassoCount() + 1;
            const div = document.createElement('div');
            div.className = 'passo';
            div.innerHTML = `
                <input type="text" name="passos[]" placeholder="Task ${passoCount}" required>
                <button type="button" class="remover-passo">Remover</button>
            `;
            passosContainer.insertBefore(div, adicionarPassoBtn);

            div.querySelector('.remover-passo').onclick = function () {
                div.remove();
            };
        });

        passosContainer.querySelectorAll('.remover-passo').forEach(btn => {
            btn.onclick = function () {
                btn.parentElement.remove();
            };
        });
    }

    if (formTask) {
        formTask.addEventListener('submit', function (event) {
            event.preventDefault();

            const objetivo = document.getElementById('objetivo')?.value || '';
            const dataEntrega = document.getElementById('dataEntrega')?.value || '';

            const participantes = [];
            document.querySelectorAll('#participantes-checkboxes input[type="checkbox"]:checked').forEach(cb => {
                participantes.push(cb.value);
            });

            const passos = [];
            passosContainer.querySelectorAll('input[name="passos[]"]').forEach(input => {
                passos.push(input.value);
            });

            const novaTask = {
                objetivo,
                dataEntrega,
                participantes,
                passos
            };

            let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(novaTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            alert('Task salva com sucesso!');
            formTask.reset();

            passosContainer.querySelectorAll('.passo').forEach((div, idx) => {
                if (idx > 0) div.remove();
            });
        });
    }

    // =============================================
    // 3. EXIBIÇÃO DAS TASKS SALVAS (ALLTASKS.HTML)
    // =============================================

    const tasksContainer = document.getElementById('tasks-container');
    if (tasksContainer) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        if (tasks.length === 0) {
            tasksContainer.innerHTML = '<p class="text-center">Nenhuma task cadastrada ainda.</p>';
            return;
        }

        tasks.forEach((task, index) => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';

            let passosHTML = '';
            if (task.passos && task.passos.length > 0) {
                passosHTML = '<ul class="passos-list">';
                task.passos.forEach(passo => {
                    passosHTML += `<li>${passo}</li>`;
                });
                passosHTML += '</ul>';
            }

            let participantesHTML = '';
            if (task.participantes && task.participantes.length > 0) {
                participantesHTML = `<p class="participantes">Participantes: ${task.participantes.join(', ')}</p>`;
            }

            taskCard.innerHTML = `
                <h3>${task.objetivo || 'Task sem título'}</h3>
                ${participantesHTML}
                <p class="data-entrega">Data de Entrega: ${task.dataEntrega || 'Não especificada'}</p>
                <h4>Passos:</h4>
                ${passosHTML}
            `;

            tasksContainer.appendChild(taskCard);
        });
    }
});



