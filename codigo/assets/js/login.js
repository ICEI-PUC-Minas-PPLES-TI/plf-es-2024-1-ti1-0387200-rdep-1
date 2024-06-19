
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var userType = document.getElementById('loginUserType').value;
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    if (userType === "",  username === "",  password === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Verificação de credenciais no localStorage
    var storedUsers = JSON.parse(localStorage.getItem('users')) || {};
    var userKey = userType + '_' + username;
    if (storedUsers[userKey] && storedUsers[userKey].password === password) {
        alert('Login bem-sucedido!');
        // Redirecionar para páginas específicas com base no tipo de usuário
        if (userType === 'cliente') {
            window.location.href = 'cliente_dashboard.html';
        } else if (userType === 'empregador') {
            window.location.href = 'empregador_dashboard.html';
        } else if (userType === 'oficial') {
            window.location.href = 'oficial_dashboard.html';
        }
    } else {
        alert('Credenciais inválidas. Por favor, verifique seu usuário e senha.');
    }
});
