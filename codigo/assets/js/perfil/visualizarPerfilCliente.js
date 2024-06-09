document.addEventListener('DOMContentLoaded', () => {
    function loadProfileSelector() {
        const profileSelector = document.getElementById('profileSelector');
        let storedData = JSON.parse(localStorage.getItem('cadastroClientes')) || [];

        storedData.forEach((data, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = data['nome'] || `Perfil ${index + 1}`;
            profileSelector.appendChild(option);
        });

        profileSelector.addEventListener('change', displaySelectedProfile);
    }

    function displaySelectedProfile() {
        const profileSelector = document.getElementById('profileSelector');
        const selectedIndex = profileSelector.value;
        let storedData = JSON.parse(localStorage.getItem('cadastroClientes')) || [];
        const selectedProfile = storedData[selectedIndex];

        const profileDiv = document.getElementById('profile');
        profileDiv.innerHTML = formatFormData(selectedProfile);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editProfile(selectedIndex));
        profileDiv.appendChild(editButton);
    }

    function formatFormData(data) {
        return `
            <p><strong>Nome:</strong> ${data['nome']}</p>
            <p><strong>Data de Nascimento:</strong> ${data['data-nascimento']}</p>
            <p><strong>Sexo:</strong> ${data['sexo']}</p>
            <p><strong>CPF:</strong> ${data['cpf']}</p>
            <p><strong>Atestado Carcerário:</strong> ${data['matricula-detento']}</p>
            <p><strong>Estado:</strong> ${data['cidade']}/${data['estado']}</p>
            <p><strong>Email:</strong> ${data['email']}</p>
        `;
    }

    function editProfile(index) {
        let storedData = JSON.parse(localStorage.getItem('cadastroClientes')) || [];
        const selectedProfile = storedData[index];

        const profileDiv = document.getElementById('profile');
        profileDiv.innerHTML = `
            <label>Nome: <input type="text" id="editNome" value="${selectedProfile['nome']}"></label><br>
            <label>Data de Nascimento: <input type="text" id="editDataNascimento" value="${selectedProfile['data-nascimento']}"></label><br>
            <label>Sexo: <input type="text" id="editSexo" value="${selectedProfile['sexo']}"></label><br>
            <label>CPF: <input type="text" id="editCPF" value="${selectedProfile['cpf']}"></label><br>
            <label>Atestado Carcerário: <input type="text" id="editMatriculaDetento" value="${selectedProfile['matricula-detento']}"></label><br>
            <label>Estado: <input type="text" id="editCidade" value="${selectedProfile['cidade']}"><input type="text" id="editEstado" value="${selectedProfile['estado']}"></label><br>
            <label>Email: <input type="text" id="editEmail" value="${selectedProfile['email']}"></label><br>
            <button id="saveButton">Salvar</button>
        `;

        document.getElementById('saveButton').addEventListener('click', () => {
            selectedProfile['nome'] = document.getElementById('editNome').value;
            selectedProfile['data-nascimento'] = document.getElementById('editDataNascimento').value;
            selectedProfile['sexo'] = document.getElementById('editSexo').value;
            selectedProfile['cpf'] = document.getElementById('editCPF').value;
            selectedProfile['matricula-detento'] = document.getElementById('editMatriculaDetento').value;
            selectedProfile['cidade'] = document.getElementById('editCidade').value;
            selectedProfile['estado'] = document.getElementById('editEstado').value;
            selectedProfile['email'] = document.getElementById('editEmail').value;

            storedData[index] = selectedProfile;
            localStorage.setItem('cadastroClientes', JSON.stringify(storedData));

            displaySelectedProfile();
        });
    }

    loadProfileSelector();
    displaySelectedProfile(); // Carrega o primeiro perfil por padrão
});
