document.addEventListener('DOMContentLoaded', () => {
    const formsContainer = document.getElementById('forms-container');
    const addNewFormButton = document.getElementById('add-new-form');
  
    // Função para adicionar eventos de submissão e remoção ao formulário
    function attachFormEvents(form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const formData = new FormData(form);
        const jsonData = {};
  
        formData.forEach((value, key) => {
          if (!jsonData[key]) {
            jsonData[key] = value;
          } else {
            if (!Array.isArray(jsonData[key])) {
              jsonData[key] = [jsonData[key]];
            }
            jsonData[key].push(value);
          }
        });
  
        // Exibir os dados do formulário em JSON em uma nova página
        const jsonOutput = JSON.stringify(jsonData, null, 2);
        const newWindow = window.open();
        newWindow.document.write('<html><head><title>Dados do Formulário</title></head><body>');
        newWindow.document.write('<pre>' + jsonOutput + '</pre>');
        newWindow.document.write('</body></html>');
        newWindow.document.close();
      });
  
      // Adicionar evento de clique ao botão de remover
      const removeButton = form.querySelector('.remove-form');
      removeButton.addEventListener('click', () => {
        form.remove();
      });
    }
  
    // Função para criar um novo formulário de vaga
    function createNewForm() {
      const originalForm = document.querySelector('.cadastro-vagas-form');
      const newForm = originalForm.cloneNode(true);
      formsContainer.appendChild(newForm);
      attachFormEvents(newForm);
    }
  
    // Evento para adicionar novo formulário
    addNewFormButton.addEventListener('click', createNewForm);
  
    // Adicionar eventos ao formulário inicial
    const initialForm = document.querySelector('.cadastro-vagas-form');
    if (initialForm) {
      attachFormEvents(initialForm);
    } else {
      createNewForm(); // Criar um formulário inicial se não houver nenhum
    }
  });  