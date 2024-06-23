// Open default tab (For You)
document.getElementById("for-you").style.display = "block";
document.querySelector(".tab-link").classList.add("active");

function openTab(event, tabName) {
  // Hide all tabcontents and remove active class from tablinks
  const tabcontents = document.getElementsByClassName("tab-content");
  for (let tabcontent of tabcontents) {
    tabcontent.style.display = "none";
  }

  const tablinks = document.getElementsByClassName("tab-link");
  for (let tablink of tablinks) {
    tablink.classList.remove("active");
  }

  // Show the specific tab content and add active class to the clicked tablink
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");
}
    // Função para abrir o modal
    function openModal(modalId) {
        document.getElementById(modalId).style.display = "block";
    }

    // Função para fechar o modal
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }

    // Adicionar evento de clique aos botões de aplicar-se
    document.querySelectorAll('.apply-btn').forEach(button => {
        button.addEventListener('click', function () {
            openModal(this.getAttribute('data-modal'));
        });
    });

    // Adicionar evento de clique aos botões de inscrever-se
    document.querySelectorAll('.enroll-btn').forEach(button => {
        button.addEventListener('click', function () {
            openModal(this.getAttribute('data-modal'));
        });
    });

    // Adicionar evento de clique ao botão de fechar dos modais
    document.querySelectorAll('.close').forEach(span => {
        span.addEventListener('click', function () {
            closeModal(this.getAttribute('data-modal'));
        });
    });

    // Fechar o modal ao clicar fora dele
    window.onclick = function (event) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }
// Função para abrir o modal de adicionar estudos
function openEducationModal() {
    var modal = document.getElementById('educationModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Função para fechar o modal de adicionar estudos
function closeEducationModal() {
    var modal = document.getElementById('educationModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Função para abrir o modal de adicionar experiência profissional
function openExperienceModal() {
    var modal = document.getElementById('experienceModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Função para fechar o modal de adicionar experiência profissional
function closeExperienceModal() {
    var modal = document.getElementById('experienceModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Event listeners para abrir e fechar o modal de adicionar estudos
document.getElementById('add-education-btn').addEventListener('click', function () {
    openEducationModal();
});

document.getElementById('close-education-modal').addEventListener('click', function () {
    closeEducationModal();
});

// Event listeners para abrir e fechar o modal de adicionar experiência profissional
document.getElementById('add-experience-btn').addEventListener('click', function () {
    openExperienceModal();
});

document.getElementById('close-experience-modal').addEventListener('click', function () {
    closeExperienceModal();
});
