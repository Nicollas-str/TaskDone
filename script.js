// Função para simular a verificação de login
document.getElementById('login').addEventListener('submit',function(event) {
    event.preventDefault(); // Impede o envio tradicional (recarregar página)
    
    const nome = document.getElementById('username').value;
    const senha = document.getElementById('password').value;

    // Simulação de verificação de dados para um futuro banco de dados
    if (nome === '123' && senha === '123') {
        alert('Login bem-sucedido!');
        window.location.href = 'pages/alltasks.html';
    } else {
        alert('Nome ou senha incorretos. Tente novamente.');
    }
});
