document.addEventListener('DOMContentLoaded', function () {
    const mostrarSenhasCheckbox = document.getElementById('mostrarSenhas');
    const cadsenha1 = document.getElementById('cadSenha');
    const cadsenha2 = document.getElementById('cadConfirmaSenha');
    const nomeUsuario = document.getElementById('cadUsuario');
    const btncriar = document.querySelector("#btncriar");
    const signupError = document.getElementById('signup-error') || document.createElement('div');

    mostrarSenhasCheckbox.addEventListener('change', function () {
        if (mostrarSenhasCheckbox.checked) {
            cadsenha1.type = 'text';
            cadsenha2.type = 'text';
        } else {
            cadsenha1.type = 'password';
            cadsenha2.type = 'password';
        }
    });

    cadsenha2.addEventListener('blur', habitarBtn);

    function habitarBtn() {
        const senha1 = cadsenha1.value.trim();
        const senha2 = cadsenha2.value.trim();

        if (senha1 === senha2 && senha1 !== "") {
            btncriar.disabled = false;
        } else {
            btncriar.disabled = true;
        }
    }

    btncriar.addEventListener('click', clickcriar);

    function clickcriar() {
        signupError.textContent = "";
        const cademail = document.querySelector("#cadEmailInput").value;
        const cadsenha = document.querySelector("#cadSenha").value;
        const nomeUsuarioValue = nomeUsuario.value;

        const acceptTerms = document.getElementById('acceptTerms');

        if (acceptTerms.checked) {
           
            // Restante do código

            if (!firebase.apps.length) {
                firebase.initializeApp(config);
            }

            const db = firebase.firestore();

            db.collection('usuarios').where('nomeUsuario', '==', nomeUsuarioValue).get()
                .then(function (querySnapshot) {
                    if (querySnapshot.empty) {
                        firebase.auth().createUserWithEmailAndPassword(cademail, cadsenha)
                            .then(function (userCredential) {
                                const userId = userCredential.user.uid;
                                db.collection('usuarios').doc(userId).set({
                                    nomeUsuario: nomeUsuarioValue,
                                    email: cademail
                                })
                                    .then(function () {
                                        console.log('Nome de usuário adicionado com sucesso!');
                                        window.location.href = "../Home/home_index.html";
                                    })
                                    .catch(function (error) {
                                        console.error('Erro ao adicionar nome de usuário:', error);
                                    });
                            })
                            .catch(function (error) {
                                console.error('Erro ao criar usuário:', error);
                            });
                    } else {
                        signupError.textContent = 'Nome de usuário já em uso. Escolha outro.';
                        signupError.style.display = 'block';
                    }
                })
                .catch(function (error) {
                    console.error('Erro ao verificar nome de usuário:', error);
                });
        } else {
            signupError.textContent = 'Você deve aceitar os Termos de Uso e apertar o botão "Confirmar" para se cadastrar.';
            signupError.style.display = 'block';
        }
    }
});

function createAccountWithGoogle() {
    const acceptTerms = document.getElementById('acceptTerms');

    if (acceptTerms.checked) {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                console.log('Usuário logado:', user);
                window.location.href = "../Home/home_index.html";
            })
            .catch((error) => {
                console.error('Erro ao autenticar com o Google:', error);
            });
    } else {
        alert('Você deve aceitar os Termos de Uso para se cadastrar com o Google.');
    }
}

function createAccountWithGitHub() {
    const acceptTerms = document.getElementById('acceptTerms');

    if (acceptTerms.checked) {
        const provider = new firebase.auth.GithubAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                console.log('Usuário logado:', user);
                window.location.href = 'Home/home_index.html';
            })
            .catch((error) => {
                console.error('Erro ao autenticar com o GitHub:', error);
            });
    } else {
        alert('Você deve aceitar os Termos de Uso para se cadastrar com o GitHub.');
    }
}
