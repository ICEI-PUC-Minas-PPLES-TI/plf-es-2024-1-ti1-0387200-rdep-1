let saldo = 100;
let bancoRegistrado = false; // Inicialmente, nenhum banco está registrado

function adicionarFundos(quantia) {
  saldo += quantia;
  document.getElementById("saldo").innerText = saldo;
}

function sacarFundos() {
  let quantia = document.getElementById("quantiaSaque").value;
  if (saldo >= quantia) {
    if (!bancoRegistrado) {
      // Se nenhum banco está registrado, mostre o formulário de informações bancárias
      document.getElementById("informacoesBancarias").style.display = "block";
    } else {
      // Se um banco está registrado, prossiga com o saque
      saldo -= quantia;
      document.getElementById("saldo").innerText = saldo;
    }
  } else {
    alert("Saldo insuficiente!");
  }
}

// Quando o formulário bancário é enviado, defina bancoRegistrado como verdadeiro
document
  .getElementById("formularioBanco")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evite que o formulário seja enviado
    bancoRegistrado = true;
    document.getElementById("informacoesBancarias").style.display = "none"; // Esconda o formulário
  });

document
  .getElementById("formularioBanco")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evite que o formulário seja enviado

    // Validação do formulário
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let banco = document.getElementById("banco").value;
    let conta = document.getElementById("conta").value;

    if (!nome || !cpf || !banco || !conta) {
      alert("Por favor, preencha todas as informações bancárias.");
      return;
    }

    // Salve as informações bancárias no armazenamento local do navegador
    let informacoesBancarias = {
      nome: nome,
      cpf: cpf,
      banco: banco,
      conta: conta
    };
    localStorage.setItem(
      "informacoesBancarias",
      JSON.stringify(informacoesBancarias)
    );

    bancoRegistrado = true;
    document.getElementById("informacoesBancarias").style.display = "none"; // Esconda o formulário
  });
