
// Zona dos cupons
const cuponsValidos = ["BEMVINDO10","FRETE20", "PROMO50","VERAO15","VIP100","BLACK30"]
const cupom = document.querySelector(".cupom-zone")
const submitCupom = document.querySelector(".submit-cupom")

let desconto = 0; 

// Se clicado/submit ele vai verificar se tem no array
submitCupom.addEventListener("click", function() {
    let valorDoCupom = cupom.value

    
    if (!cuponsValidos.includes(valorDoCupom) || !usuarioAtual.carrinho.some(item => item.binario)) {

        // Mensagem de cupom ja aplicado
        cupom.value = "Cupom Inválido e/ou já usado!"
        cupom.classList.add("cupom-aplicado")
        cupom.style.color = "red"
        cupom.style.border = "2px solid #db1212"
        setTimeout(() => { cupom.classList.remove("cupom-aplicado"); cupom.style.color = ""; cupom.style.border = ""; cupom.value = "" }, 2000)
        
        return
    }

    switch(valorDoCupom){
        case "BEMVINDO10":
            desconto = (usuarioAtual.total) / 10
            break

        case "FRETE20":
            desconto = (usuarioAtual.total) / 5
            break

        case "PROMO50":
            desconto = 50
            break

        case "VERAO15":
            desconto = (usuarioAtual.total) / (100/15)
            break

        case "VIP100":
            desconto = 100
            break

        case "BLACK30":
            desconto = ((usuarioAtual.total) / 10) * 3
            break
    }

    // Aplicando o desconto no localstorage + mensagem válida
    desconto = Math.min(desconto, usuarioAtual.total)
    usuarioAtual.total = usuarioAtual.total - desconto
    usuarioAtual.desconto = desconto
    usuarioAtual.carrinho.forEach(item => item.binario = false)
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtual))

    // Mensagem de cupom aplicado 
    cupom.value = "Cupom aplicado!"
    cupom.classList.add("cupom-aplicado")
    cupom.style.border = "2px solid #2ecc71"
    cupom.style.color = "#2ecc71"
    setTimeout(() => { cupom.classList.remove("cupom-aplicado"); cupom.value = ""; cupom.style.border = ""; cupom.style.color = "" }, 2000)

    modalTotal.innerText = "R$ " + usuarioAtual.total.toFixed(2)
    valorTotal.innerText = "Total: R$ " + usuarioAtual.total.toFixed(2)
    totalCarrinho.innerText = "R$ " + usuarioAtual.total.toFixed(2)


})
    