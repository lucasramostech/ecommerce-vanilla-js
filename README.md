# Ecommerce v1.0

Loja virtual simples feita com HTML, CSS e JavaScript puro, sem frameworks ou dependências externas.

## Funcionalidades

### Autenticação
- Login com e-mail e senha validados no frontend
- Cadastro automático ao tentar logar com um e-mail ainda não registrado
- Validação de e-mail (formato `usuario@dominio.extensao`)
- Validação de senha (mínimo 8 caracteres, ao menos 1 letra maiúscula e 1 caractere especial entre `@`, `$`, `%`, `&`, `*`, `#`)
- Persistência da sessão via `localStorage`
- Logout com limpeza da sessão

### Vitrine de Produtos
- Produtos carregados dinamicamente da [Fake Store API](https://fakestoreapi.com/products)
- Grid responsivo com cards contendo imagem, nome, preço e botão de compra

### Carrinho
- Adição de produtos ao carrinho com acúmulo do valor total
- Total exibido em tempo real no header
- Estado do carrinho persistido no `localStorage` por usuário

### Carteira
- Cada usuário criado recebe automaticamente R$ 500,00 de saldo inicial
- Saldo vinculado ao perfil do usuário no `localStorage`

## Estrutura de Arquivos

```
Ecommerce/
├── index.html        # Página principal (vitrine de produtos)
├── login.html        # Página de login/cadastro
├── css/
│   └── style.css     # Estilos globais
└── js/
    ├── auth.js       # Validação de login e cadastro de usuários
    ├── index.js      # Exibe o e-mail do usuário logado e controla logout
    ├── produtos.js   # Busca e renderiza produtos da API
    ├── carrinho.js   # Lógica de adição de itens e cálculo do total
    ├── wallet.js     # Gerenciamento de saldo (em desenvolvimento)
    └── cupom.js      # Lógica de cupons de desconto (em desenvolvimento)
```

## Como Usar

1. Clone o repositório
2. Abra `login.html` diretamente no navegador (sem necessidade de servidor)
3. Digite um e-mail válido e uma senha que atenda aos requisitos
4. Se o e-mail não existir, uma conta será criada automaticamente com R$ 500,00 de saldo
5. Após o login, você será redirecionado para a vitrine de produtos
6. Clique em **Comprar** para adicionar produtos ao carrinho
7. O total acumulado é exibido no header em tempo real
8. Clique em **Log Out** para encerrar a sessão

## Tecnologias

- HTML5
- CSS3 (Grid Layout, Flexbox)
- JavaScript ES6+
- LocalStorage API
- [Fake Store API](https://fakestoreapi.com)

## Observações

- Projeto sem backend — todos os dados são armazenados no `localStorage` do navegador
- As senhas são armazenadas localmente sem criptografia: **não use senhas reais**
- Requer conexão com a internet para carregar os produtos da API externa

## Próximas Versões

Em desenvolvimento...