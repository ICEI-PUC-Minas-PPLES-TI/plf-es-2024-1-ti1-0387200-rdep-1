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
        userData.matriculaDetento = document.getElementById('clienteMatriculaDetento').value;
        userData.email = document.getElementById('clienteEmail').value;
        userData.endereco = {
            rua: document.getElementById('rua').value,
            numero: document.getElementById('numero').value,
            complemento: document.getElementById('complemento').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value
        };
    } else if (userType === 'empregador') {
        userData.razaoSocial = document.getElementById('empregadorRazaoSocial').value;
        userData.cnpj = document.getElementById('empregadorCnpj').value;
        userData.cnae = document.getElementById('empregadorCnae').value;
        userData.cep = document.getElementById('empregadorCep').value;
        userData.endereco = {
            rua: document.getElementById('ruaTS').value,
            numero: document.getElementById('numeroTS').value,
            complemento: document.getElementById('complementoTS').value,
            bairro: document.getElementById('bairroTS').value,
            cidade: document.getElementById('cidadeTS').value,
            estado: document.getElementById('estadoTS').value
        };
        userData.email = document.getElementById('empregadorEmail').value;
    } else if (userType === 'oficial') {
        userData.nome = document.getElementById('oficialNome').value;
        userData.carteiraFuncional = document.getElementById('oficialCarteiraFuncional').value;
        userData.dataNascimento = document.getElementById('oficialDataNascimento').value;
        userData.telefone = document.getElementById('oficialTelefone').value;
        userData.sexo = document.getElementById('oficialSexo').value;
        userData.endereco = document.getElementById('oficialEndereco').value;
        userData.endereco = {
            rua: document.getElementById('rua').value,
            numero: document.getElementById('numero').value,
            complemento: document.getElementById('complemento').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value
        };
    }

    // Armazenar dados de cadastro no localStorage
    var storedUsers = JSON.parse(localStorage.getItem('users')) || {};
    var userKey = userType + '_' + username;

    if (storedUsers[userKey]) {
        alert('Usuário já existe. Por favor, escolha um nome de usuário diferente.');
    } else {
        storedUsers[userKey] = userData;
        localStorage.setItem('users', JSON.stringify(storedUsers));
        alert('Cadastro bem-sucedido!');

        // Redirecionar ou executar ações específicas para cada tipo de usuário
        if (userType === 'cliente') {
            window.location.href = 'cliente_dashboard.html';
        } else if (userType === 'empregador') {
            window.location.href = 'empregador_dashboard.html';
        } else if (userType === 'oficial') {
            window.location.href = 'oficial_dashboard.html';
        }
    }
});

async function buscarEndereco(cepId) {
    const cep = document.getElementById(cepId).value.replace('-', '');

    if (!cep || !/^\d{8}$/.test(cep)) {
        alert('Por favor, insira um CEP válido.');
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!response.ok) {
            throw new Error('Erro ao buscar o endereço.');
        }

        const data = await response.json();

        if (data.erro) {
            throw new Error('CEP não encontrado.');
        }

        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;
    } catch (error) {
        alert(error.message);
    }
}

