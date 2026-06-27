
// Conecta a API fakestore
const vitrine = document.querySelector("#vitrine-produtos")
fetch("https://fakestoreapi.com/products")
    .then(resposta => resposta.json())
    .then(produtos => {
        
        produtos.forEach(produto => {
            
        
            vitrine.innerHTML += `
                <div class="card-produto">
                    <img src="${produto.image}" alt="${produto.title}" class="img-produto">
                    <h3 class="titulo-produto">${produto.title}</h3>
                    <p class="preco-produto">R$ ${produto.price.toFixed(2)}</p>
                    <button class="btn-comprar" data-id="${produto.id}">Comprar</button>
                    
                    
                </div>
            `
        })
        carrinho()
    })

    