// Função para simular a verificação de login
function verificarLogin() {
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;

    // Simulação de verificação de dados para um futuro banco de dados
    if (nome === 'admin' && senha === '1234') {
        alert('Login bem-sucedido!');
        window.location.href = 'pages/alltasks.html';
    } else {
        alert('Nome ou senha incorretos. Tente novamente.');
    }
}

document.querySelector('.login-button').addEventListener('click', verificarLogin);