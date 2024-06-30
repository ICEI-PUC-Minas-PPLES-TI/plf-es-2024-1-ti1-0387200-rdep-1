function openTab(evt, tabName) {
  const tabLinks = document.getElementsByClassName("tab-link");
  const tabContents = document.getElementsByClassName("tab-content");

  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function openProfile() {
  document.getElementById("homepage-content").style.display = "none";
  document.getElementById("profile-content").style.display = "block";
}

function closeProfile() {
  document.getElementById("profile-content").style.display = "none";
  document.getElementById("homepage-content").style.display = "block";
}

function openCustomization() {
  document.getElementById("profile-content").style.display = "none";
  document.getElementById("customization-content").style.display = "block";
}

function closeCustomization() {
  document.getElementById("customization-content").style.display = "none";
  document.getElementById("profile-content").style.display = "block";
}

function openAnalises(jobTitle) {
  document.getElementById("homepage-content").style.display = "none";
  document.getElementById("analises-content").style.display = "block";
  document.getElementById("job-title").innerText = jobTitle;
}

function closeAnalises() {
  document.getElementById("analises-content").style.display = "none";
  document.getElementById("homepage-content").style.display = "block";
}

function saveCustomization() {
  const companyName = document.getElementById("company-name").value;
  const companyAddress = document.getElementById("company-address").value;
  const companySector = document.getElementById("company-sector").value;

  const companyData = {
    name: companyName,
    address: companyAddress,
    sector: companySector
  };

  localStorage.setItem("companyData", JSON.stringify(companyData));

  closeCustomization();
}

function loadCustomization() {
  const companyData = JSON.parse(localStorage.getItem("companyData"));

  if (companyData) {
    document.getElementById("company-name").value = companyData.name;
    document.getElementById("company-address").value = companyData.address;
    document.getElementById("company-sector").value = companyData.sector;
  }
}

window.onload = function() {
  loadCustomization();
};

function viewProfile(candidateName) {
  // Redirecionar ou exibir perfil do
}