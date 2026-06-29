// Validar o login (email/senha)

const email = document.querySelector(".email")
const password = document.querySelector(".senha")
const buttom = document.querySelector(".submit")
const errorBox = document.querySelector(".error")

function showMessage(msg, isSucesso = false) {
    errorBox.textContent = msg
    errorBox.classList.toggle("success", isSucesso)
    errorBox.style.display = "flex"
}


// Função que transforma a senha em hash (SHA-256) -> Bitcoin ;>
async function hashSenha(senha) {
    const encoder = new TextEncoder()
    const data = encoder.encode(senha)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
}


// Função que valida o email
function emailValidator() {
    let valueEmail = email.value

    if (valueEmail.includes("@")){
        let texto = valueEmail.slice(valueEmail.indexOf("@"))
        if (texto.includes(".")) {
            return true
        } else { return false}
    }
}



// Função que valida a senha
// Requisitos (8 caract; Upper; [@,$,%,&,*, #])
function passwordValidator() {
    let valuePassword = password.value
    let verificationUpper = /[A-Z]/.test(valuePassword); let verificationSpecialsCases = /[@$%&*#]/.test(valuePassword)

    if (valuePassword.length >= 8 && verificationUpper && verificationSpecialsCases) {
        return true
    } else {return false}
}



// Cadastrando novo usuário
async function newUser() {
    let novoUsuario = {
        email: email.value,
        senha: await hashSenha(password.value),
        saldo: 500.00,
        total: 0,
        desconto: 0,
        carrinho: []
    }


    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    listaUsuarios.push(novoUsuario)
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios))

}



// Quando dar submit
if (buttom) {
buttom.addEventListener("click", async (event) => {
    event.preventDefault()

    if (!emailValidator()) {
        showMessage("E-mail inválido! Corrija para continuar.")

    } else {
        if (!passwordValidator()) {
            showMessage("Senha inválida! Corrija para continuar.")
        } else {

            // Local Storage
            let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || []
            let usuarioEncontrado = listaUsuarios.find(usuario => usuario.email === email.value)

            if (!usuarioEncontrado) {
                showMessage("E-mail não encontrado! Criando uma conta...", true)
                await newUser()
                return
            }


            if (usuarioEncontrado.senha === await hashSenha(password.value)) {
                showMessage("Login realizado com sucesso! Seja bem-vindo.", true)
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado))
                setTimeout(() => { window.location.href = "index.html" }, 800)
                return

            } else { showMessage("Senha incorreta!") }
        }
    }
})}