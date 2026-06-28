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

    const produtoCarrinho = {
        id: idProduto,
        nome: event.target.closest(".card-produto").querySelector(".titulo-produto").innerText,
        preco: event.target.closest(".card-produto").querySelector(".preco-produto").innerText,
        image: event.target.closest(".card-produto").querySelector(".img-produto").src,
        quantidade: 1
    }

    const produtoExistente = usuarioAtual.carrinho.find(item => item.id === idProduto)

    if (produtoExistente) {
        produtoExistente.quantidade++
        
    } else {
        usuarioAtual.carrinho.push(produtoCarrinho)
    }

    let valorProduto = +produtoCarrinho.preco.slice(3)
    usuarioAtual.total += valorProduto

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
            totalCarrinho.innerText = usuarioAtual.total.toFixed(2)
        })
    })
}



// Carrinho click
const carrinhoBar = document.querySelector("#carrinho-sidebar")
const carrinhoLogo = document.querySelector(".carrinho_logo")

carrinhoLogo.addEventListener("click", function() {
    carrinhoBar.style.display = "flex"
})


// Fechar carrinho
const carrinhoClose = document.querySelector("#fechar-carrinho")

carrinhoClose.addEventListener("click", function() {
    carrinhoBar.style.display = "none"
})


// Total carrinho
const totalCarrinho = document.querySelector("#carrinho-total")
totalCarrinho.innerText = "R$ "+ usuarioAtual.total.toFixed(2) 


