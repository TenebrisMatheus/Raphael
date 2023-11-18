function toggleMenu() {
    var menuDropdown = document.getElementById("menuDropdown");
    menuDropdown.classList.toggle("show-menu");
}

document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('Sair');

    logoutButton.addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
         window.location.href = '../Cadastro/cadastro.html';
         })
        .catch((error) => {
        console.error('Erro ao encerrar a sessão: ', error);
    });
  });
});