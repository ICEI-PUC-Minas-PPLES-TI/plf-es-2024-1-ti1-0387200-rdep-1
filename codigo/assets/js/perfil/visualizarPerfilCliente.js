document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const profileData = {
                nome: document.getElementById('nome').value,
                cpf: document.getElementById('cpf').value,
                rg: document.getElementById('rg').value,
                dataNascimento: document.getElementById('data-nascimento').value,
                estadoCivil: document.querySelector('select[name="estadocivil"]').value,
                telefone: document.getElementById('telefone').value,
                sexo: document.querySelector('input[name="sexo"]:checked').value,
                rua: document.querySelector('input[name="rua"]').value,
                numero: document.querySelector('input[name="numero"]').value,
                bairro: document.querySelector('input[name="bairro"]').value,
                estado: document.querySelector('select[name="estado"]').value,
                cidade: document.querySelector('input[name="cidade"]').value,
                cep: document.querySelector('input[name="cep"]').value,
                matriculaDetento: document.getElementById('matricula-detento').value,
                email: document.getElementById('email').value,
                senha: document.getElementById('senha').value
            };

            localStorage.setItem('profile', JSON.stringify(profileData));

            window.location.href = 'profile.html';
        });
    }

    const profileDisplay = document.getElementById('profileDisplay');
    if (profileDisplay) {
        const storedProfile = JSON.parse(localStorage.getItem('profile')) || [];
        if (storedProfile) {
            const profile = JSON.parse(storedProfile);
            document.getElementById('displayNome').textContent = profile.nome;
            document.getElementById('displayCpf').textContent = profile.cpf;
            document.getElementById('displayRg').textContent = profile.rg;
            document.getElementById('displayDataNascimento').textContent = profile.dataNascimento;
            document.getElementById('displayEstadoCivil').textContent = profile.estadoCivil;
            document.getElementById('displayTelefone').textContent = profile.telefone;
            document.getElementById('displaySexo').textContent = profile.sexo;
            document.getElementById('displayRua').textContent = profile.rua;
            document.getElementById('displayNumero').textContent = profile.numero;
            document.getElementById('displayBairro').textContent = profile.bairro;
            document.getElementById('displayEstado').textContent = profile.estado;
            document.getElementById('displayCidade').textContent = profile.cidade;
            document.getElementById('displayCep').textContent = profile.cep;
            document.getElementById('displayMatriculaDetento').textContent = profile.matriculaDetento;
            document.getElementById('displayEmail').textContent = profile.email;
        }
    }
});
