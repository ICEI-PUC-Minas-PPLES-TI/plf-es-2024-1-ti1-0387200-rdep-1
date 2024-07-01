function createHeaderAndFooter() {
  var header = document.querySelector('header');
  var footer = document.querySelector('footer');

  header.innerHTML = `
      <nav class="navbar navbar-expand-lg bg-success fixed-top" data-bs-theme="success">
          <div class="container-fluid px-5">
            <a class="navbar-brand" href="/codigo/index.html">RDEP</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Raphael Sena Augusto de Brito</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 text-light">
                  <li class="nav-item">
                    <a class="nav-link" href="/codigo/sobre.html">Sobre Nós</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/codigo/index.html">Sair</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </nav>
      <div id="search-message-container"></div>
  `;

  footer.innerHTML = `
      <div class="text-center mt-3">
        <p>Voltar ao topo<button id="scroll-to-top-btn" class="btn btn"><i class="fa-solid fa-arrow-up fa-bounce fa-2xl" style="color: #5c5c5c;"></i></button></p>
      </div>
      <div class="container__footer">
      <div class="box__footer">
        <h2>Acesse</h2>
        <a href="/code/index.html">Página Inicial</a>
        <a href="/code/index.html">Sobre Nós</a>
      </div>

      <div class="box__footer">
        <h2>Conecte-se</h2>
        <a target="_blank" href="https://github.com/raphael-sena"><i class="fab fa-github-square"></i> GitHub</a>
        <a target="_blank" href="#"><i class="fab fa-linkedin"></i> Linkedin</a>
        <a href="#"><i class="fa-solid fa-envelope"></i> Gmail</a>
      </div>
    </div>

    <div class="box__copyright">
        <hr />
        <p>Todos os direitos reservados © 2024 <b>RDEP</b></p>
      </div>
  `;

  const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
  if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener('click', function() {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  const pesquisaForm = document.getElementById('search-form');
  if (pesquisaForm) {
      pesquisaForm.addEventListener('submit', function(event) {
          event.preventDefault();
          const query = document.getElementById('search-input').value.toLowerCase();
          const tituloSection = document.querySelectorAll('.section-title');

          let encontrado = false;
          tituloSection.forEach(title => {
              const section = title.closest('section');
              if (title.textContent.toLowerCase().includes(query)) {
                  section.style.display = '';
                  encontrado = true;
              } else {
                  section.style.display = 'none';
              }
          });

          const messageContainer = document.getElementById('search-message-container');
          const semResultado = document.getElementById('no-results');
          if (!encontrado) {
              if (!semResultado) {
                  const semResultadoMessage = document.createElement('div');
                  semResultadoMessage.id = 'no-results';
                  semResultadoMessage.className = 'alert alert-warning';
                  semResultadoMessage.textContent = 'Nenhuma seção encontrada para a pesquisa.';
                  messageContainer.appendChild(semResultadoMessage);
              }
          } else {
              if (semResultado) {
                  semResultado.remove();
              }
          }
      });
  }
}

window.addEventListener("load", createHeaderAndFooter);