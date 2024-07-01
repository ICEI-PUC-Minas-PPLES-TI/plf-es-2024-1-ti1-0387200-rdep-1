document.addEventListener("DOMContentLoaded", function () {
  carregarVagas();

  document.getElementById('vaga-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const novaVaga = {
      titulo: document.getElementById('titulo').value,
      servico: document.getElementById('servico').value,
      salario: document.getElementById('salario').value,
      escolaridade: document.getElementById('escolaridade').value,
      local: document.getElementById('local').value,
      beneficios: document.getElementById('beneficios').value,
      descricao: document.getElementById('descricao').value,
      contratado: null  // Adiciona campo para o contratado
    };

    let vagas = JSON.parse(localStorage.getItem('vagas')) || [];
    vagas.push(novaVaga);
    localStorage.setItem('vagas', JSON.stringify(vagas));
    carregarVagas();
    closeModal();
  });
});

function openModal() {
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function carregarVagas() {
  const vagas = JSON.parse(localStorage.getItem('vagas')) || [];
  const jobList = document.getElementById('job-list');
  jobList.innerHTML = vagas.map((vaga, index) => `
    <div class="job-card">
      <h3>${vaga.titulo}</h3>
      <p>Serviço: ${vaga.servico}</p>
      <p>Salário: ${vaga.salario}</p>
      <p>Escolaridade: ${vaga.escolaridade}</p>
      <p>Local: ${vaga.local}</p>
      <p>Benefícios: ${vaga.beneficios}</p>
      <p>Descrição: ${vaga.descricao}</p>
      <button class="button" onclick="openAnalises('${vaga.titulo}')">Ver Aplicações</button>
      <button class="button" onclick="encerrarVaga(${index})" ${vaga.contratado ? '' : 'disabled'}>Encerrar Vaga</button>
    </div>
  `).join('');
}

function encerrarVaga(index) {
  let vagas = JSON.parse(localStorage.getItem('vagas')) || [];
  let vagaEncerrada = vagas.splice(index, 1)[0];
  localStorage.setItem('vagas', JSON.stringify(vagas));
  carregarVagas();
  atualizarHistorico(vagaEncerrada);
}

function atualizarHistorico(vaga) {
  const historicoList = document.getElementById('historico-list');
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  historicoList.innerHTML += `
    <div class="job-card">
      <h3>${vaga.titulo}</h3>
      <p>Serviço: ${vaga.servico}</p>
      <p>Salário: ${vaga.salario}</p>
      <p>Escolaridade: ${vaga.escolaridade}</p>
      <p>Local: ${vaga.local}</p>
      <p>Benefícios: ${vaga.beneficios}</p>
      <p>Descrição: ${vaga.descricao}</p>
      <p>Fechada em: ${dataAtual}</p>
      <p>Contratado: ${vaga.contratado || 'N/A'}</p>
    </div>
  `;
}

function openAnalises(jobTitle) {
  toggleView('homepage-content', 'analises-content');
  document.getElementById('job-title').textContent = jobTitle;

  const applicationList = document.getElementById('application-list');
  applicationList.innerHTML = ''; // Limpar lista de candidatos

  // Simulação de candidatos:
  const candidatos = [
    { nome: 'Candidato 1', perfil: 'perfil1.html' },
    { nome: 'Candidato 2', perfil: 'perfil2.html' },
  ];

  candidatos.forEach(candidato => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${candidato.nome}</span>
      <button onclick="visitarPerfil('${candidato.perfil}')">Visitar Perfil</button>
      <button onclick="escolherContratado('${jobTitle}', '${candidato.nome}')">Escolher Contratado</button>
    `;
    applicationList.appendChild(li);
  });
}

function visitarPerfil(perfil) {
  window.location.href = perfil; // Navega para o perfil do candidato
}

function escolherContratado(jobTitle, candidatoNome) {
  let vagas = JSON.parse(localStorage.getItem('vagas')) || [];
  const vaga = vagas.find(v => v.titulo === jobTitle);
  if (vaga) {
    vaga.contratado = candidatoNome;
    localStorage.setItem('vagas', JSON.stringify(vagas));
    alert(`Candidato ${candidatoNome} escolhido para a vaga ${jobTitle}.`);
    carregarVagas();
    closeAnalises();
  }
}

function closeAnalises() {
  toggleView('analises-content', 'homepage-content');
}

function openProfile() {
  toggleView('homepage-content', 'profile-content');
}

function closeProfile() {
  toggleView('profile-content', 'homepage-content');
}

function openCustomization() {
  toggleView('profile-content', 'customization-content');
}

function closeCustomization() {
  toggleView('customization-content', 'profile-content');
}

function saveCompanyDetails() {
  const companyName = document.getElementById('company-name').value;
  const companyAddress = document.getElementById('company-address').value;
  const companySector = document.getElementById('company-sector').value;

  document.getElementById('display-company-name').textContent = `Nome da Empresa: ${companyName}`;
  document.getElementById('display-company-address').textContent = `Endereço: ${companyAddress}`;
  document.getElementById('display-company-sector').textContent = `Setor: ${companySector}`;

  closeCustomization();
}

function openTab(evt, tabName) {
  const tabLinks = document.getElementsByClassName("tab-link");
  const tabContents = document.getElementsByClassName("tab-content");

  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove('active');
  }

  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove('active');
  }

  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');
}

function toggleView(hideId, showId) {
  document.getElementById(hideId).style.display = 'none';
  document.getElementById(showId).style.display = 'block';
}
