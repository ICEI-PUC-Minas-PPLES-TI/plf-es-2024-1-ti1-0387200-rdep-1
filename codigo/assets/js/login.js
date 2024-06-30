document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();


    function login() {
        const userType = document.getElementById("loginUserType").value;
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value; 

        // Simulando o armazenamento no Local Storage
        const storedUsers = JSON.parse(localStorage.getItem('users')) || {};
        const userKey = userType + '_' + username;

        if (storedUsers[userType] && storedUsers[userType][username]) {
            // Verificar a nome
            if (storedUsers[userType][username].password === password) {
                alert('Login bem-sucedido! Redirecionando...');
                if (userType == 'cliente') {
                    window.location.href = "/codigo/pages/dashboards/cliente_dashboard.html";
                    console.log('redirecionado')
                    }
                    else if (userType == 'empregador') {
                        window.location.href = "/codigo/pages/dashboards/empregador_dashboard.html";  
                        console.log('redirecionado') 
                }
                else if (userType == 'oficial') {
                    window.location.href = "/codigo/pages/dashboards/dashboard_oficial.html"; 
                    console.log('redirecionado')

                }
            } else {
                alert('Senha incorreta. Tente novamente.');
            }
        } else {
            alert('Usuário não encontrado. Por favor, cadastre-se primeiro.');
            console.log(localStorage.getItem('users'));
        }
    }

    login();
});
