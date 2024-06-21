document.addEventListener('DOMContentLoaded', () => {
  function displayStoredData() {
    const storedDataList = document.getElementById('storedDataList');
    if (storedDataList) {
      storedDataList.innerHTML = '';
  
      let storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
  
      storedData.forEach((data, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.textAlign = 'left';
  
        const formattedData = formatFormData(data);
        card.innerHTML = formattedData;
  
  
        const verDetalhes = document.createElement('a');
        verDetalhes.textContent = 'Ver detalhes';
        verDetalhes.className = 'btn btn-primary';
        verDetalhes.href = 'detalheVagas.html';
        card.appendChild(verDetalhes);
        
  
        storedDataList.appendChild(card);
      });
    } else {
      console.error('Element with ID "storedDataList" not found.');
    }
  }
  
    // Função para preencher o formulário de cadastro de vagas com dados da vaga selecionada
    function editVaga(data) {
    const form = document.querySelector('.cadastro-vagas-form');
    form.reset();

    // Preenche o formulário com os dados da vaga selecionada
    Object.keys(data).forEach(key => {
      const input = form.querySelector(`[name="${key}"]`);
      if (input) {
        input.value = data[key];
      }
    });

    // Role a página para o topo para visualizar o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
    // Função para remover uma vaga pelo ID
    function removeVagaById(id) {
      let storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
      storedData = storedData.filter(data => data.id !== id);
      localStorage.setItem('formSubmissions', JSON.stringify(storedData));
      displayStoredData();
    }
  
    // Função para formatar os dados do formulário em HTML amigável
    function formatFormData(data) {
      return `
        <h3>Vaga ${data['titulo-vaga']}</h3>
        <p><strong>ID da Vaga:</strong> ${data.id}</p>
        <p><strong>Sobre a Vaga:</strong> ${data['sobre-a-vaga']}</p>
        <p><strong>Benefício 1:</strong> ${data['beneficio1']}</p>
        <p><strong>Benefício 2:</strong> ${data['beneficio2']}</p>
        <p><strong>Benefício 3:</strong> ${data['beneficio3']}</p>
      `;
    }
  
    // Inicializar a lista de dados armazenados ao carregar a página
    displayStoredData();
  });
  