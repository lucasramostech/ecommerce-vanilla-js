
// Puxando o nome do usuário que entrou 
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"))
const campoEmail = document.querySelector("#usuario-email")
campoEmail.innerText = "Oi, " + usuario.email

// Botão de back
const backButtom = document.querySelector(".log-out")

backButtom.addEventListener("click", function() {
    localStorage.removeItem("usuarioLogado")
    window.location.href = "login.html"
     
})