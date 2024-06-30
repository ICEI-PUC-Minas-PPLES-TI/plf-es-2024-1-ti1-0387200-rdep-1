document.getElementById('registerUserType').addEventListener('change', function(event) {
    var userType = event.target.value;
    document.getElementById('clienteFields').classList.add('hidden');
    document.getElementById('empregadorFields').classList.add('hidden');
    document.getElementById('oficialFields').classList.add('hidden');

    if (userType === 'cliente') {
        document.getElementById('clienteFields').classList.remove('hidden');
        enableFormFields('clienteFields');
        disableFormFields('empregadorFields');
        disableFormFields('oficialFields');
    } else if (userType === 'empregador') {
        document.getElementById('empregadorFields').classList.remove('hidden');
        enableFormFields('empregadorFields');
        disableFormFields('clienteFields');
        disableFormFields('oficialFields');
    } else if (userType === 'oficial') {
        document.getElementById('oficialFields').classList.remove('hidden');
        enableFormFields('oficialFields');
        disableFormFields('clienteFields');
        disableFormFields('empregadorFields');
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
        if (!validateClienteForm()) {
            return;
        }
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
        if (!validateEmpregadorForm()) {
            return;
        }
        userData.razaoSocial = document.getElementById('empregadorRazaoSocial').value;
        userData.cnpj = document.getElementById('empregadorCnpj').value;
        userData.cnae = document.getElementById('empregadorCnae').value;
        userData.cep = document.getElementById('empregadorCep').value;
        userData.email = document.getElementById('empregadorEmail').value;
        userData.endereco = {
            rua: document.getElementById('ruaTS').value,
            numero: document.getElementById('numeroTS').value,
            complemento: document.getElementById('complementoTS').value,
            bairro: document.getElementById('bairroTS').value,
            cidade: document.getElementById('cidadeTS').value,
            estado: document.getElementById('estadoTS').value
        };
    } else if (userType === 'oficial') {
        if (!validateOficialForm()) {
            return;
        }
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

        // Preencher os campos de endereço de acordo com o tipo de usuário
        if (cepId === 'clienteCep') {
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
        } else if (cepId === 'empregadorCep') {
            document.getElementById('ruaTS').value = data.logradouro;
            document.getElementById('bairroTS').value = data.bairro;
            document.getElementById('cidadeTS').value = data.localidade;
            document.getElementById('estadoTS').value = data.uf;
        }
    } catch (error) {
        alert(error.message);
    }
}

function disableFormFields(fieldsId) {
    var fields = document.getElementById(fieldsId).querySelectorAll('input, select');
    fields.forEach(function(field) {
        field.disabled = true;
    });
}

function enableFormFields(fieldsId) {
    var fields = document.getElementById(fieldsId).querySelectorAll('input, select');
    fields.forEach(function(field) {
        field.disabled = false;
    });
}

function validateClienteForm() {
    var nome = document.getElementById('clienteNome').value;
    var rg = document.getElementById('clienteRg').value;
    var dataNascimento = document.getElementById('clienteDataNascimento').value;
    var estadoCivil = document.getElementById('clienteEstadoCivil').value;
    var telefone = document.getElementById('clienteTelefone').value;
    var sexo = document.getElementById('clienteSexo').value;
    var matriculaDetento = document.getElementById('clienteMatriculaDetento').value;
    var email = document.getElementById('clienteEmail').value;
    var rua = document.getElementById('rua').value;
    var numero = document.getElementById('numero').value;
    var complemento = document.getElementById('complemento').value;
    var bairro = document.getElementById('bairro').value;
    var cidade = document.getElementById('cidade').value;
    var estado = document.getElementById('estado').value;

    if (nome === "" || rg === "" || dataNascimento === "" || estadoCivil === "" || telefone === "" || sexo === "" ||
        matriculaDetento === "" || email === "" || rua === "" || numero === "" || complemento === "" ||
        bairro === "" || cidade === "" || estado === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    return true;
}

function validateEmpregadorForm() {
    var razaoSocial = document.getElementById('empregadorRazaoSocial').value;
    var cnpj = document.getElementById('empregadorCnpj').value;
    var cnae = document.getElementById('empregadorCnae').value;
    var cep = document.getElementById('empregadorCep').value;
    var ruaTS = document.getElementById('ruaTS').value;
    var numeroTS = document.getElementById('numeroTS').value;
    var complementoTS = document.getElementById('complementoTS').value;
    var bairroTS = document.getElementById('bairroTS').value;
    var cidadeTS = document.getElementById('cidadeTS').value;
    var estadoTS = document.getElementById('estadoTS').value;
    var email = document.getElementById('empregadorEmail').value;

    if (razaoSocial === "" || cnpj === "" || cnae === "" || cep === "" || ruaTS === "" || numeroTS === "" ||
        complementoTS === "" || bairroTS === "" || cidadeTS === "" || estadoTS === "" || email === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    return true;
}

function validateOficialForm() {
    var nome = document.getElementById('oficialNome').value;
    var carteiraFuncional = document.getElementById('oficialCarteiraFuncional').value;
    var dataNascimento = document.getElementById('oficialDataNascimento').value;
    var telefone = document.getElementById('oficialTelefone').value;
    var sexo = document.getElementById('oficialSexo').value;
    var endereco = document.getElementById('oficialEndereco').value;

    if (nome === "" || carteiraFuncional === "" || dataNascimento === "" || telefone === "" || sexo === "" || endereco === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    return true;
}
