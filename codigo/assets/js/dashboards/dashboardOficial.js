let editingUserKey = null;

function formatDetails(user) {
  return `
            <div>Nome: ${user.nome}</div>
            <div>RG: ${user.rg}</div>
            <div>Data de Nascimento: ${user.dataNascimento}</div>
            <div>Estado Civil: ${user.estadoCivil}</div>
            <div>Telefone: ${user.telefone}</div>
            <div>Sexo: ${user.sexo}</div>
            <div>Endereço: ${user.endereco}</div>
            ${
              user.userType === "cliente"
                ? `<div>Matrícula de Detento: ${user.matriculaDetento}</div>`
                : ""
            }
            ${
              user.userType === "empregador"
                ? `<div>CNPJ: ${user.cnpj}</div>`
                : ""
            }
            ${
              user.userType === "empregador"
                ? `<div>CNAE: ${user.cnae}</div>`
                : ""
            }
            ${
              user.userType === "oficial"
                ? `<div>Carteira Funcional: ${user.carteiraFuncional}</div>`
                : ""
            }
            <button class="btn btn-sm btn-warning mt-2" onclick="editUser('${
              user.userType
            }_${user.username}')">Editar</button>
            <button class="btn btn-sm btn-danger mt-2" onclick="deleteUser('${
              user.userType
            }_${user.username}')">Excluir</button>
        `;
}

function updateTable(users) {
  var tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";

  Object.keys(users)
    .slice(0, 20)
    .forEach((key) => {
      var user = users[key];
      var row = tableBody.insertRow();
      row.insertCell(0).innerText = user.userType;
      row.insertCell(1).innerText = user.username;
      row.insertCell(2).innerText = user.email || "N/A";
      row.insertCell(3).innerHTML = formatDetails(user);
    });
}

function loadUsers() {
  var storedUsers = JSON.parse(localStorage.getItem("users")) || {};
  updateTable(storedUsers);
}

function deleteUser(userKey) {
  var storedUsers = JSON.parse(localStorage.getItem("users")) || {};
  delete storedUsers[userKey];
  localStorage.setItem("users", JSON.stringify(storedUsers));
  alert("Usuário excluído com sucesso!");
  loadUsers();
}

function editUser(userKey) {
  var storedUsers = JSON.parse(localStorage.getItem("users")) || {};
  var user = storedUsers[userKey];
  if (user) {
    editingUserKey = userKey;
    document.getElementById("editUsername").value = user.username;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editPassword").value = user.password;
    document.getElementById("editTelefone").value = user.telefone;
    document.getElementById("editEndereco").value = user.endereco;
    document.getElementById("editOffcanvas").classList.add("show");
  }
}

document
  .getElementById("editForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var storedUsers = JSON.parse(localStorage.getItem("users")) || {};
    if (editingUserKey && storedUsers[editingUserKey]) {
      var user = storedUsers[editingUserKey];
      user.password = document.getElementById("editPassword").value;
      user.telefone = document.getElementById("editTelefone").value;
      user.endereco = document.getElementById("editEndereco").value;

      storedUsers[editingUserKey] = user;
      localStorage.setItem("users", JSON.stringify(storedUsers));
      alert("Dados atualizados com sucesso!");
      document.getElementById("editOffcanvas").classList.remove("show");
      loadUsers();
    }
  });

document.getElementById("showPassword").addEventListener("change", function () {
  var passwordField = document.getElementById("editPassword");
  if (this.checked) {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
});

function searchProfiles() {
  var searchValue = document.getElementById("searchInput").value;
  var storedUsers = JSON.parse(localStorage.getItem("users")) || {};
  var filteredUsers = Object.keys(storedUsers).reduce((filtered, key) => {
    var user = storedUsers[key];
    if (
      (user.userType === "cliente" && user.matriculaDetento === searchValue) ||
      (user.userType === "empregador" && user.cnpj === searchValue)
    ) {
      filtered[key] = user;
    }
    return filtered;
  }, {});
  updateTable(filteredUsers);
}

document.addEventListener("DOMContentLoaded", function () {
  loadUsers();
});
