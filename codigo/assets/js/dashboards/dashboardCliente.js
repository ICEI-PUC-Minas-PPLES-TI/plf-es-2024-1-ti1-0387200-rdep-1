document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const navLinks = document.getElementById('navLinks');

    loginBtn.onclick = function() {
        loginModal.style.display = 'block';
    }

    closeModal.onclick = function() {
        loginModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
    }

    document.getElementById('loginForm').onsubmit = function(event) {
        event.preventDefault();
        // Simulate successful login
        loginBtn.style.display = 'none';
        navLinks.style.display = 'flex';
        loginModal.style.display = 'none';
    }
});

document.getElementById('avatarIcon').addEventListener('click', function() {
  window.location.href = 'perfil.html';
});
