document.addEventListener('DOMContentLoaded', () => {
    function displayStoredData() {
      const storedDataList = document.getElementById('storedDataList');
      storedDataList.innerHTML = '';
  
      let storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
          
      storedData.forEach((data, index) => {
        const div1 = document.createElement('div');
        div1.className = 'row';
        const div2 = document.createElement('div');
        div2.className = 'col-md-6';
        const card = document.createElement('div');
        card.className = 'card my-3 p-3';
        card.style.textAlign = 'left';
  
        const formattedData = formatFormData(data);
        card.innerHTML = formattedData;
  
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'btn btn-primary';
        editButton.addEventListener('click', () => editVaga(data));
        card.appendChild(editButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.className = 'btn btn-danger';
        removeButton.addEventListener('click', () => removeVagaById(data.id));
        card.appendChild(removeButton);
  
        storedDataList.appendChild(card);
      });
    }

    // Função para preencher o formulário de cadastro de vagas com dados da vaga selecionada
    function editVaga(data) {
    const form = document.querySelector('.cadastro-servico-form');
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
        <h3>Pagamento ${data.id}</h3>
        <p><strong>ID do Pagamento:</strong> ${data.id}</p>
        <p><strong>Título do pagamento:</strong> ${data['titulo-servico']}</p>
        <p><strong>Sobre o pagamento:</strong> ${data['sobre-o-pagamento']}</p>
        <p><strong>Valor do pagamento:</strong> ${data['valorPago']}</p>
      `;
    }
  
    // Inicializar a lista de dados armazenados ao carregar a página
    displayStoredData();
  });
  