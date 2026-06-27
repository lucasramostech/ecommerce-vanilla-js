// Carrinho 
let usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado"))
const valorTotal = document.querySelector(".valorTotal")

if (usuarioAtual) {
    valorTotal.innerText = "Total: R$ " + usuarioAtual.total.toFixed(2)
}

function addItems(event, idProduto, valorTotal) {
    if (!usuarioAtual) return

    const produtoCarrinho = {
        id: idProduto,
        nome: event.target.closest(".card-produto").querySelector(".titulo-produto").innerText,
        preco: event.target.closest(".card-produto").querySelector(".preco-produto").innerText
    }

    usuarioAtual.carrinho.push(produtoCarrinho)

    let valorProduto = +produtoCarrinho.preco.slice(3)
    usuarioAtual.total += valorProduto

    // Atualiza o obj do localstorage do usuário logado
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtual))
    let listaUsuariosGeral = JSON.parse(localStorage.getItem("usuarios")) || []
    let indiceUsuario = listaUsuariosGeral.findIndex(u => u.email === usuarioAtual.email)
    if (indiceUsuario !== -1) {
        listaUsuariosGeral[indiceUsuario] = usuarioAtual
        localStorage.setItem("usuarios", JSON.stringify(listaUsuariosGeral))
    }

    valorTotal.innerText = "Total: R$ " + usuarioAtual.total.toFixed(2)
}


function carrinho() {
    const buttomClick = document.querySelectorAll(".btn-comprar")

    buttomClick.forEach((botao) => {
        botao.addEventListener("click", (event) => {
            const idProduto = event.target.dataset.id
            
            addItems(event, idProduto, valorTotal)
        })
    })
}