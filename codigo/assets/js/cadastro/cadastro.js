document.getElementById('registerUserType').addEventListener('change', function(event) {
    var userType = event.target.value;
    document.getElementById('clienteFields').classList.add('hidden');
    document.getElementById('empregadorFields').classList.add('hidden');
    document.getElementById('oficialFields').classList.add('hidden');
    
    if (userType === 'cliente') {
        document.getElementById('clienteFields').classList.remove('hidden');
    } else if (userType === 'empregador') {
        document.getElementById('empregadorFields').classList.remove('hidden');
    } else if (userType === 'oficial') {
        document.getElementById('oficialFields').classList.remove('hidden');
    }
  });
  
  document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var userType = document.getElementById('registerUserType').value;
    var username = document.getElementById('registerUsername').value;
    var password = document.getElementById('registerPassword').value;
  
    if (userType === "" || username === "" || password === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }
  
    var userData = {
        username: username,
        password: password,
        userType: userType
    };
  
    // Coleta de dados específicos para cada tipo de usuário
    if (userType === 'cliente') {
        userData.nome = document.getElementById('clienteNome').value;
        userData.rg = document.getElementById('clienteRg').value;
        userData.dataNascimento = document.getElementById('clienteDataNascimento').value;
        userData.estadoCivil = document.getElementById('clienteEstadoCivil').value;
        userData.telefone = document.getElementById('clienteTelefone').value;
        userData.sexo = document.getElementById('clienteSexo').value;
        // userData.endereco = document.getElementById('clienteEndereco').value;
        userData.matriculaDetento = document.getElementById('clienteMatriculaDetento').value;
        userData.email = document.getElementById('clienteEmail').value;

    } else if (userType === 'empregador') {
        userData.razaoSocial = document.getElementById('empregadorRazaoSocial').value;
        userData.cnpj = document.getElementById('empregadorCnpj').value;
        userData.cnae = document.getElementById('empregadorCnae').value;
        userData.endereco = document.getElementById('empregadorEndereco').value;
        userData.email = document.getElementById('empregadorEmail').value;

        console.log('empregadorRazaoSocial:', userData.razaoSocial);
        console.log('empregadorCnpj:', userData.cnpj);
        console.log('empregadorCnae:', userData.cnae);
        console.log('empregadorEndereco:', userData.endereco);
        console.log('empregadorEmail:', userData.email);

    } else if (userType === 'oficial') {
      userData.nome = document.getElementById('oficialNome').value;
      userData.carteiraFuncional = document.getElementById('oficialCarteiraFuncional').value;
      userData.dataNascimento = document.getElementById('oficialDataNascimento').value;
      userData.telefone = document.getElementById('oficialTelefone').value;
      userData.sexo = document.getElementById('oficialSexo').value;
      userData.endereco = document.getElementById('oficialEndereco').value;
    }
  
    // Armazenar dados de cadastro no localStorage
    var storedUsers = JSON.parse(localStorage.getItem('users')) || {};
    var userKey = userType + '_' + username;
  
    if (storedUsers[userKey]) {
        alert('Usuário já existe. Por favor, escolha um nome de usuário diferente.');
    } else {
        // Armazenar em objetos separados no localStorage
        // storageUsers.cliente
        // storageUsers.empregador
        // storageUsers.oficial
        if (!storedUsers[userType]) {
            storedUsers[userType] = {};
        }
        storedUsers[userType][username] = userData;
        localStorage.setItem('users', JSON.stringify(storedUsers));
        alert('Cadastro bem-sucedido!');
    }
  });
  