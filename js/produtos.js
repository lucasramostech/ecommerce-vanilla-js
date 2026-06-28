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
                usuarioLogado.carrinho.forEach(produto => {
                    let produtoName = produto.nome.split(' ').slice(0, 3).join(' ')
                    const existente = listaCompras.querySelector(`[data-id="${produto.id}"]`)

                    if (existente) {
                        existente.querySelector('p').textContent = `${produto.preco} (x${produto.quantidade})`
                    } else {
                        const imgSrc = (produtos.find(p => p.id == produto.id)?.image) || ''
                        const div = document.createElement('div')
                        div.className = 'item-carrinho'
                        div.dataset.id = produto.id
                        div.style.cssText = 'display:flex; align-items:center; margin-bottom:10px;'
                        div.innerHTML = `
                            <div style="margin-right:10px;"><img src="${imgSrc}" alt="${produtoName}" style="width:50px;height:50px;object-fit:contain;" onerror="this.style.display='none'"></div>
                            <div><h4>${produtoName}</h4><p>${produto.preco} (x${produto.quantidade})</p></div>
                        `
                        listaCompras.appendChild(div)
                    }
                })
            } else {
                listaCompras.innerHTML = ""
            }
        }

        atualizarCarrinhoTela()


        carrinho()
    })