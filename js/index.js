// Puxando o nome do usuário que entrou
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"))
if (!usuario) window.location.href = "login.html"
const campoEmail = document.querySelector("#usuario-email")
campoEmail.innerText = "Oi, " + usuario.email


// Botão de back carrinho
const backButtom = document.querySelector(".log-out")

backButtom.addEventListener("click", function() {
    localStorage.removeItem("usuarioLogado")
    window.location.href = "login.html"
     
})


// Botão de open do finalizar compras
const finalizarCompra = document.querySelector("#finalizar-compra")
const finalizarCompras = document.querySelector("#modal-finalizar-compra")


// Botão de back do finalizar compras
const backFinalizar = document.querySelector("#fechar-modal")
backFinalizar.addEventListener("click", function() {
    finalizarCompras.style.display = "none"
    
})



// Total finalizar compras
const modalTotal = document.querySelector("#modal-total")
modalTotal.innerText = "R$ "+ usuarioAtual.total.toFixed(2)


// Abrir ->
finalizarCompra.addEventListener("click", function() {
    const dadosAtuais = JSON.parse(localStorage.getItem("usuarioLogado"))
    modalTotal.innerText = "R$ " + dadosAtuais.total.toFixed(2)
    finalizarCompras.style.display = "flex"
})


