// Conectando a API da fakestore e exibindo na tela
const vitrine = document.querySelector("#vitrine-produtos")
const listaCompras = document.querySelector("#carrinho-itens")

fetch("https://fakestoreapi.com/products")
    .then(resposta => resposta.json())
    .then(produtos => {
        
        let html = ""
        produtos.forEach(produto => {
            html += `
                <div class="card-produto">
                    <img src="${produto.image}" alt="${produto.title}" class="img-produto">
                    <h3 class="titulo-produto">${produto.title}</h3>
                    <p class="preco-produto">R$ ${produto.price.toFixed(2)}</p>
                    <button class="btn-comprar" data-id="${produto.id}">Comprar</button>
                </div>
            `
        })
        vitrine.innerHTML = html

        // Função de injeção de HTML
        window.atualizarCarrinhoTela = function() {
            const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
            
            

            if (usuarioLogado && usuarioLogado.carrinho) {
                let itensHtml = ""
                usuarioLogado.carrinho.forEach(produto => {
                    itensHtml += `
                        <div class="item-carrinho" style="display: flex; align-items: center; margin-bottom: 10px;">
                            <div style="font-size: 24px; margin-right: 10px;">X</div>
                            <div>
                                <h4>${produto.nome}</h4>
                                <p>${produto.preco} (x${produto.quantidade})</p>
                            </div>
                        </div>
                    `
                })
                listaCompras.innerHTML = itensHtml
            } else {
                listaCompras.innerHTML = ""
            }
        }

        atualizarCarrinhoTela()


        carrinho()
    })