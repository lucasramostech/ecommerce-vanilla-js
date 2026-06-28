# Ecommerce v3.0

Loja virtual feita com HTML, CSS e JavaScript puro, sem frameworks ou dependências externas.

**Deploy:** [ecommerce-vanilla-js-lucasramostech.vercel.app](https://ecommerce-vanilla-js-lucasramostech.vercel.app/login.html)

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
- Incremento de quantidade ao adicionar o mesmo produto mais de uma vez
- Total exibido em tempo real no header e no sidebar do carrinho
- Sidebar lateral com lista de itens (imagem, nome, preço e quantidade de cada produto)
- Sidebar abre ao clicar no ícone do carrinho e fecha pelo botão de fechar
- Estado do carrinho persistido no `localStorage` por usuário e sincronizado com a lista geral de usuários

### Cupons de Desconto
- Campo de cupom disponível no modal de finalizar compra
- Cupom é validado e aplicado em tempo real sobre o total atual
- Desconto é revertido automaticamente ao adicionar novos itens após aplicação
- Cupons disponíveis:

| Cupom | Desconto |
|-------|----------|
| `BEMVINDO10` | 10% de desconto |
| `FRETE20` | 20% de desconto |
| `VERAO15` | 15% de desconto |
| `BLACK30` | 30% de desconto |
| `PROMO50` | R$ 50,00 de desconto |
| `VIP100` | R$ 100,00 de desconto |

### Modal de Finalizar Compra
- Modal abre ao clicar em **Finalizar Compra** no sidebar do carrinho
- Exibe o total atualizado da compra
- Campo para inserir e aplicar cupom de desconto
- Botão para confirmar o pedido (integração com carteira em desenvolvimento)

### Carteira
- Cada usuário criado recebe automaticamente R$ 500,00 de saldo inicial
- Saldo vinculado ao perfil do usuário no `localStorage`
- Exibição do saldo e dedução ao confirmar pedido em desenvolvimento (`wallet.js`)

### Responsividade
- Responsivo
- Layout adaptado para tablets e celulares


## Estrutura de Arquivos

```
Ecommerce/
├── index.html        # Página principal (vitrine, sidebar do carrinho e modal de finalizar compra)
├── login.html        # Página de login/cadastro
├── css/
│   └── style.css     # Estilos globais e media queries responsivas
├── assets/
│   └── carrinho_logo.png  # Ícone do carrinho
└── js/
    ├── auth.js       # Validação de login e cadastro de usuários
    ├── index.js      # Exibe o e-mail do usuário logado, controla logout e modal de finalizar compra
    ├── produtos.js   # Busca e renderiza produtos da API; atualiza o sidebar do carrinho
    ├── carrinho.js   # Lógica de adição de itens, cálculo do total e controle do sidebar
    ├── cupom.js      # Lógica de cupons de desconto
    └── wallet.js     # Gerenciamento de saldo (em desenvolvimento)
```

## Como Usar

1. Clone o repositório
2. Abra `login.html` diretamente no navegador (sem necessidade de servidor)
3. Digite um e-mail válido e uma senha que atenda aos requisitos
4. Se o e-mail não existir, uma conta será criada automaticamente com R$ 500,00 de saldo — faça login novamente para entrar
5. Após o login, você será redirecionado para a vitrine de produtos
6. Clique em **Comprar** para adicionar produtos ao carrinho
7. O total acumulado é exibido no header em tempo real
8. Clique no ícone do carrinho para abrir o sidebar e ver os itens adicionados
9. No sidebar, clique em **Finalizar Compra** para abrir o modal de checkout
10. No modal, insira um cupom válido (opcional) e clique em **Confirmar Pedido**
11. Clique em **Log Out** para encerrar a sessão

## Tecnologias

- HTML5
- CSS3 (Grid Layout, Flexbox, Media Queries)
- JavaScript ES6+
- LocalStorage API
- [Fake Store API](https://fakestoreapi.com)

## Observações

- Projeto sem backend — todos os dados são armazenados no `localStorage` do navegador
- As senhas são armazenadas localmente sem criptografia: **não use senhas reais**
- Requer conexão com a internet para carregar os produtos da API externa
- Um cupom só pode ser aplicado uma vez por sessão de compra; adicionar novos itens reverte o desconto

## Próximas Versões

- **wallet.js:** exibir saldo disponível no header, deduzir saldo ao confirmar pedido e bloquear compra caso o saldo seja insuficiente
- **Confirmar Pedido:** limpar carrinho, atualizar saldo e exibir confirmação ao finalizar a compra
- Fechar modal ao clicar fora (overlay)
- Mensagem visual quando o carrinho está vazio
- Indicador de carregamento enquanto os produtos são buscados da API
