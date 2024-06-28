document.addEventListener('DOMContentLoaded', () => {
  function displayStoredData() {
    const storedDataList = document.getElementsByClassName('storedDataListEmpresa')[0];
    storedDataList.innerHTML = '';

    // Buscar os dados dos empregadores do localStorage
    let storedUsers = JSON.parse(localStorage.getItem('users')) || {};

    if (typeof storedUsers !== 'object') {
      console.error('Os dados recuperados não são um objeto válido.');
      return;
    }

    const storedEmpregadores = Object.values(storedUsers.empregador || []);

    if (!Array.isArray(storedEmpregadores)) {
      console.error('Os dados recuperados não são um array válido.');
      return;
    }

    if (storedEmpregadores.length === 0) {
      console.log('Não foi possível retornar os dados dos empregadores.');
      return;
    }

    // Exibir os dados em formato de tabela no console
    console.table(storedEmpregadores);

    storedEmpregadores.forEach((data, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.textAlign = 'left';

      const formattedData = formatFormData(data);
      card.innerHTML = formattedData;

      storedDataList.appendChild(card);
    });
  }
  

  // Função para formatar os dados do formulário em HTML amigável
  function formatFormData(data) {
    return `
      <p><strong>Razão social:</strong> ${data['razaoSocial']}</p>
      <p><strong>CNPJ:</strong> ${data['cnpj']}</p>
      <p><strong>CNAE:</strong> ${data['cnae']}</p>
      <p><strong>Endereço:</strong> ${data['endereco']}</p>
      <p><strong>Email:</strong> ${data['email']}</p>
    `;
  }

  // Inicializar a lista de dados armazenados ao carregar a página
  displayStoredData();
});
