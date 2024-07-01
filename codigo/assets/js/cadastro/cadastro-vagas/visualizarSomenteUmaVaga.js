document.addEventListener('DOMContentLoaded', () => {
    function displaySelectedVaga() {
        const vagaDetalhada = document.getElementById('vagaDetalhada');
        if (!vagaDetalhada) {
            console.error('Element with ID "vagaDetalhada" not found.');
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const vagaId = urlParams.get('id');

        const storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        const vaga = storedData.find(data => data.id === vagaId);

        if (vaga) {
            vagaDetalhada.innerHTML = formatVagaData(vaga);
        } else {
            vagaDetalhada.innerHTML = '<p>Vaga não encontrada.</p>';
        }
    }

    // Função para formatar os dados da vaga em HTML amigável
    function formatVagaData(data) {
        return `
            <div class="card p-3">
                <h3>${data['titulo-vaga']}</h3>
                <p><strong>Sobre a Vaga:</strong> ${data['sobre-a-vaga']}</p>
                <p><strong>Salário:</strong> ${data['salario']}</p>
                <p><strong>Escolaridade:</strong> ${data['escolaridade']}</p>
                <p><strong>Benefícios:</strong> ${data['beneficio']}</p>
                <p><strong>Local:</strong> ${data['local']}</p>
            </div>
        `;
    }

    // Inicializar a visualização da vaga selecionada ao carregar a página
    displaySelectedVaga();
});