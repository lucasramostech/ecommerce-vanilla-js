// Carrinho 
let usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado"))
if (!usuarioAtual) window.location.href = "login.html"
const valorTotal = document.querySelector(".valorTotal")

if (usuarioAtual) {
    valorTotal.innerText = "Total: R$ " + usuarioAtual.total.toFixed(2)
}

// Calcula o total das compras
function addItems(event, idProduto, valorTotal) {
    if (!usuarioAtual) return

    if (usuarioAtual.desconto > 0) {
        usuarioAtual.total += usuarioAtual.desconto
        usuarioAtual.desconto = 0
    }

    const produtoCarrinho = {
        id: idProduto,
        nome: event.target.closest(".card-produto").querySelector(".titulo-produto").innerText,
        preco: event.target.closest(".card-produto").querySelector(".preco-produto").innerText,
        image: event.target.closest(".card-produto").querySelector(".img-produto").src,
        quantidade: 1,
        binario: true
    }

    const produtoExistente = usuarioAtual.carrinho.find(item => item.id === idProduto)

    if (produtoExistente) {
        produtoExistente.quantidade++
        produtoExistente.binario = true

    } else {
        usuarioAtual.carrinho.push(produtoCarrinho)
    }

    let valorProduto = +produtoCarrinho.preco.slice(3)
    usuarioAtual.total = usuarioAtual.total + valorProduto

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtual))
    
    let listaUsuariosGeral = JSON.parse(localStorage.getItem("usuarios")) || []
    let indiceUsuario = listaUsuariosGeral.findIndex(u => u.email === usuarioAtual.email)
    
    if (indiceUsuario !== -1) {
        listaUsuariosGeral[indiceUsuario] = usuarioAtual
        localStorage.setItem("usuarios", JSON.stringify(listaUsuariosGeral))
    }
    
    valorTotal.innerText = "Total: R$ " + usuarioAtual.total.toFixed(2)

    atualizarCarrinhoTela()
}


// Função que detecta click no botão de comprar
function carrinho() {
    const buttomClick = document.querySelectorAll(".btn-comprar")

    
    // Evento de click
    buttomClick.forEach((botao) => {
        botao.addEventListener("click", (event) => {
            const idProduto = event.target.dataset.id            
            addItems(event, idProduto, valorTotal)
            totalCarrinho.innerText = "R$ " + usuarioAtual.total.toFixed(2)
        })
    })
}



// Carrinho click
const carrinhoBar = document.querySelector("#carrinho-sidebar")
const carrinhoLogo = document.querySelector(".carrinho_logo")

carrinhoLogo.addEventListener("click", function() {
    carrinhoBar.classList.add("aberto")
})


// Fechar carrinho
const carrinhoClose = document.querySelector("#fechar-carrinho")

carrinhoClose.addEventListener("click", function() {
   carrinhoBar.classList.remove("aberto")
})


// Total carrinho
const totalCarrinho = document.querySelector("#carrinho-total")
totalCarrinho.innerText = "R$ "+ usuarioAtual.total.toFixed(2)


// Função que altera a quantidade
function alterarQuantidade(idProduto, operacao) {
    usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado"))

    if (usuarioAtual.desconto > 0) {
        usuarioAtual.total += usuarioAtual.desconto
        usuarioAtual.desconto = 0
    }

    const produto = usuarioAtual.carrinho.find(item => item.id === idProduto)

    if (operacao == "+") { 
        produto.quantidade++
         usuarioAtual.total += +produto.preco.slice(3)
    } else {

        if (produto.quantidade === 1) {
            const indice = usuarioAtual.carrinho.findIndex(item => item.id === idProduto)
            usuarioAtual.carrinho.splice(indice, 1)
            
    }
        produto.quantidade--
        usuarioAtual.total -= +produto.preco.slice(3)
    } 

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtual))

    let listaUsuariosGeral = JSON.parse(localStorage.getItem("usuarios")) || []
    let indiceUsuario = listaUsuariosGeral.findIndex(u => u.email === usuarioAtual.email)
    if (indiceUsuario !== -1) {
        listaUsuariosGeral[indiceUsuario] = usuarioAtual
        localStorage.setItem("usuarios", JSON.stringify(listaUsuariosGeral))
    }

    valorTotal.innerText = "Total: R$ " + usuarioAtual.total.toFixed(2)
    totalCarrinho.innerText = "R$ " + usuarioAtual.total.toFixed(2)
    atualizarCarrinhoTela()
}




// Evento de click
document.querySelector("#carrinho-itens").addEventListener("click", function(event) {
    const btnAumentar = event.target.closest(".btn-aumentar")
    const btnDiminuir = event.target.closest(".btn-diminuir")

    if (btnAumentar) {
        alterarQuantidade(btnAumentar.dataset.id, "+")
    }

    if (btnDiminuir){
        alterarQuantidade(btnDiminuir.dataset.id, "-")
    }
})