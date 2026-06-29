
// Chama no queryy
const finalbtn = document.querySelector("#confirmar-compra")

// Função que calcula o saldo
function newSaldo() {

    if (usuarioAtual.total > usuarioAtual.saldo) {
        const popupErro = document.querySelector("#popup-saldo-insuficiente")
        popupErro.style.display = "block"
        setTimeout(() => { popupErro.style.display = "none" }, 3000)
        return false
    }
    
    usuarioAtual.saldo = (usuarioAtual.saldo || 0) - usuarioAtual.total
    if (usuarioAtual.cupomPendente) {
        usuarioAtual.cuponsUsados = [...(usuarioAtual.cuponsUsados || []), usuarioAtual.cupomPendente]
        usuarioAtual.cupomPendente = null
    }
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtual))

    const modalTotal = document.querySelector("#modal-total")
    modalTotal.innerText = "R$ 0"
    
    return true

}

// Exibindo o saldo na tela
const saldoTempoReal = document.querySelector("#saldo-usuario")
saldoTempoReal.innerText = "Saldo: R$ " + usuarioAtual.saldo.toFixed(2)


function limparCarrinho() {
    usuarioAtual.carrinho = []
    usuarioAtual.carrinho = []
    usuarioAtual.total = 0
    usuarioAtual.desconto = 0
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtual))

     // Atualiza a tela ao vivo
    atualizarCarrinhoTela()
    valorTotal.innerText = "Total: R$ 0,00"
    totalCarrinho.innerText = "R$ 0,00"

    // Fecha o modal
    document.querySelector("#modal-finalizar-compra").style.display = "none"

    // PopUp de sucesso
    const popup = document.querySelector("#popup-sucesso")

    popup.style.display = "block"
    setTimeout(() => { popup.style.display = "none" }, 3000)


    // Exibindo o saldo na tela
    const saldoTempoReal = document.querySelector("#saldo-usuario")
    saldoTempoReal.innerText = "Saldo: R$ " + usuarioAtual.saldo.toFixed(2)

    usuarioAtual.carrinho = []; usuarioAtual.total = 0; usuarioAtual.desconto = 0

    // Sincroniza no array de usuarios para persistir após logout
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    let indice = listaUsuarios.findIndex(u => u.email === usuarioAtual.email)
    if (indice !== -1) {
        listaUsuarios[indice] = usuarioAtual
        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios))
    }

} 



// Ve o evento de clique e chama a função
finalbtn.addEventListener("click", function() {
    let resultado = newSaldo()  
    
    if (resultado == false) {
    } else {
        limparCarrinho()
    }

    
})


