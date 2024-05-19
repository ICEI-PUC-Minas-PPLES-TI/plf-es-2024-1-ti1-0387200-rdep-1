document.addEventListener('DOMContentLoaded', () => {
    function displayStoredData() {
      const storedDataList = document.getElementById('storedDataList');
      storedDataList.innerHTML = '';
  
      let storedData = JSON.parse(localStorage.getItem('cadastroEmpregadores')) || [];
  
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
  
        storedDataList.appendChild(card);
      });
    }


    // Função para formatar os dados do formulário em HTML amigável
    function formatFormData(data) {
      return `
        <p><strong>Razão social:</strong> ${data['razao-social']}</p>
        <p><strong>CNPJ:</strong> ${data['cnpj']}</p>
        <p><strong>CNAE:</strong> ${data['cnae']}</p>
        <p><strong>Cidade/estado:</strong> ${data['cidade']}/${data['estado']}</p>
      `;
    }
  
    // Inicializar a lista de dados armazenados ao carregar a página
    displayStoredData();
  });
  