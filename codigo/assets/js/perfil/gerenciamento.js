document.addEventListener('DOMContentLoaded', () => {
    const profileSelector = document.getElementById('profileSelector');
    const profileDetails = document.getElementById('profileDetails');
    const profileForm = document.getElementById('profileForm');

    function loadProfiles() {
        const storedData = JSON.parse(localStorage.getItem('cadastroClientes')) || [];
        profileSelector.innerHTML = '';

        storedData.forEach((data, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = data['nome'] || `Perfil ${index + 1}`;
            profileSelector.appendChild(option);
        });

        if (storedData.length > 0) {
            profileSelector.value = 0;
            displayProfileDetails(0);
        } else {
            profileDetails.innerHTML = '<p>Nenhum perfil encontrado.</p>';
        }
    }

    function displayProfileDetails(index) {
        const storedData = JSON.parse(localStorage.getItem('cadastroClientes')) || [];
        const profile = storedData[index];

        if (profile) {
            profileDetails.innerHTML = formatProfileData(profile);
            profileForm.innerHTML = generateEditForm(profile, index);
        }
    }

    function formatProfileData(data) {
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

    function generateEditForm(data, index) {
        return `
            <label>Nome: <input type="text" id="editNome" value="${data['nome']}"></label><br>
            <label>Data de Nascimento: <input type="text" id="editDataNascimento" value="${data['data-nascimento']}"></label><br>
            <label>Sexo: <input type="text" id="editSexo" value="${data['sexo']}"></label><br>
            <label>CPF: <input type="text" id="editCPF" value="${data['cpf']}"></label><br>
            <label>Atestado Carcerário: <input type="text" id="editMatriculaDetento" value="${data['matricula-detento']}"></label><br>
            <label>Estado: <input type="text" id="editCidade" value="${data['cidade']}"><input type="text" id="editEstado" value="${data['estado']}"></label><br>
            <label>Email: <input type="text" id="editEmail" value="${data['email']}"></label><br>
            <button id="saveButton">Salvar</button>
            <button id="deleteButton">Deletar</button>
        `;

        document.getElementById('saveButton').addEventListener('click', () => saveProfile(index));
        document.getElementById('deleteButton').addEventListener('click', () => deleteProfile(index));
    }

    function saveProfile(index) {
        const storedData = JSON.parse(localStorage.getItem('cadastroClientes')) || [];
        const profile = storedData[index];

        profile['nome'] = document.getElementById('editNome').value;
        profile['data-nascimento'] = document.getElementById('editDataNascimento').value;
        profile['sexo'] = document.getElementById('editSexo').value;
        profile['cpf'] = document.getElementById('editCPF').value;
        profile['matricula-detento'] = document.getElementById('editMatriculaDetento').value;
        profile['cidade'] = document.getElementById('editCidade').value;
        profile['estado'] = document.getElementById('editEstado').value;
        profile['email'] = document.getElementById('editEmail').value;

        storedData[index] = profile;
        localStorage.setItem('cadastroClientes', JSON.stringify(storedData));
        loadProfiles();
    }

    function deleteProfile(index) {
        let storedData = JSON.parse(localStorage.getItem('cadastroClientes')) || [];
        storedData.splice(index, 1);
        localStorage.setItem('cadastroClientes', JSON.stringify(storedData));
        loadProfiles();
    }

    profileSelector.addEventListener('change', () => {
        const selectedIndex = profileSelector.value;
        displayProfileDetails(selectedIndex);
    });

    loadProfiles();
});
