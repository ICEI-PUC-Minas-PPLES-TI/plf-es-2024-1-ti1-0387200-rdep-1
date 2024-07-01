let trainings = JSON.parse(localStorage.getItem('trainings')) || [];

  if (document.getElementById('trainings-container')) {
    const container = document.getElementById('trainings-container');
    const newTrainingButton = document.getElementById('new-training-button');

    if (trainings.length > 0) {
      trainings.forEach(training => {
        const trainingCard = document.createElement('div');
        trainingCard.classList.add('training-card');
        trainingCard.innerHTML = `
          <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" src="${training.url}" allowfullscreen></iframe>
          </div>
          <h3><a href="treinamento-detalhes.html?title=${encodeURIComponent(training.title)}">${training.title}</a></h3>
        `;
        container.appendChild(trainingCard);
      });
      newTrainingButton.innerHTML = `
        <button class="btn btn-primary" onclick="window.location.href='cadastrar-treinamento.html'">Cadastrar Novo Treinamento</button>
      `;
    } else {
      container.innerHTML = `
        <p>Não encontramos nenhum treinamento disponível.</p>
        <p><a href="cadastrar-treinamento.html">Clique aqui para cadastrar um novo treinamento.</a></p>
      `;
    }
  }

  if (document.getElementById('training-form')) {
    const form = document.getElementById('training-form');

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const newTraining = {
        title: form.title.value,
        url: form.url.value,
        description: form.description.value
      };
      trainings.push(newTraining);
      localStorage.setItem('trainings', JSON.stringify(trainings));
      window.location.href = 'treinamentos.html';
    });
  }

  if (document.getElementById('training-details')) {
    const urlParams = new URLSearchParams(window.location.search);
    const trainingTitle = urlParams.get('title');
    const training = trainings.find(t => t.title === trainingTitle);

    if (training) {
      document.getElementById('training-title').textContent = training.title;
      document.getElementById('training-video').src = training.url;
      document.getElementById('training-description').textContent = training.description;
    }
  }