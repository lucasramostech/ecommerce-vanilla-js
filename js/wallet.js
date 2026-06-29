
// Chama no queryy
let usuarioAtualSaldo = JSON.parse(localStorage.getItem("usuarioLogado"))
const finalbtn = document.querySelector("#confirmar-compra")

// Função que calcula o saldo
function newSaldo() {

    usuarioAtualSaldo = JSON.parse(localStorage.getItem("usuarioLogado"))
    if (usuarioAtualSaldo.total > usuarioAtualSaldo.saldo) { 
        alert("Dinheiro insuficiente")
        return false
    
    }
    
    usuarioAtualSaldo.saldo = (usuarioAtualSaldo.saldo || 0) - usuarioAtualSaldo.total
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualSaldo))
    usuarioAtual.saldo = usuarioAtualSaldo.saldo

    const modalTotal = document.querySelector("#modal-total")
    modalTotal.innerText = "R$ 0"
    
    return true

}

// Exibindo o saldo na tela
const saldoTempoReal = document.querySelector("#saldo-usuario")
saldoTempoReal.innerText = "Saldo: R$ " + usuarioAtualSaldo.saldo.toFixed(2)


function limparCarrinho() {
    let usuarioAtualSaldo = JSON.parse(localStorage.getItem("usuarioLogado"))
    usuarioAtualSaldo.carrinho = []
    usuarioAtualSaldo.carrinho = []
    usuarioAtualSaldo.total = 0
    usuarioAtualSaldo.desconto = 0
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualSaldo))

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
    saldoTempoReal.innerText = "Saldo: R$ " + usuarioAtualSaldo.saldo.toFixed(2)

    usuarioAtual.carrinho = []; usuarioAtual.total = 0; usuarioAtual.desconto = 0

    // Sincroniza no array de usuarios para persistir após logout
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    let indice = listaUsuarios.findIndex(u => u.email === usuarioAtualSaldo.email)
    if (indice !== -1) {
        listaUsuarios[indice] = usuarioAtualSaldo
        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios))
    }

}



// Ve o evento de clique e chama a função
finalbtn.addEventListener("click", function() {
    let resultado = newSaldo()  // chama UMA vez e guarda o retorno
    
    if (resultado == false) {
    } else {
        limparCarrinho()
    }

    
})


