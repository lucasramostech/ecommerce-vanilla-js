# Ecommerce v4.0

Loja virtual feita com HTML, CSS e JavaScript puro — sem frameworks ou dependências externas.

**Deploy:** [ecommerce-vanilla-js-lucasramostech.vercel.app](https://ecommerce-vanilla-js-lucasramostech.vercel.app/login.html)

---

## Funcionalidades

### Autenticação
- Login com e-mail e senha validados no frontend
- Cadastro automático ao tentar logar com e-mail ainda não registrado
- Validação de formato de e-mail e senha (mínimo 8 caracteres, ao menos 1 maiúscula e 1 caractere especial entre `@`, `$`, `%`, `&`, `*`, `#`)
- Senhas armazenadas com hash SHA-256 via Web Crypto API
- Feedback visual em caso de erro ou sucesso
- Sessão persistida via `localStorage`; logout limpa tudo e redireciona para o login

### Vitrine de Produtos
- Produtos carregados dinamicamente da [Fake Store API](https://fakestoreapi.com/products)
- Grid responsivo com cards contendo imagem, nome, preço e botão de compra

### Carrinho
- Produtos adicionados acumulam o total; adicionar o mesmo item incrementa a quantidade
- Sidebar lateral com lista de itens e controle de quantidade via **+** e **−** (zerar remove o item)
- Total atualizado em tempo real no header e no sidebar
- Carrinho limpo automaticamente após confirmar o pedido
- Estado persistido no `localStorage` por usuário

### Cupons de Desconto
- Disponível no modal de checkout; aplicado e validado em tempo real
- Desconto é revertido se novos itens forem adicionados após a aplicação
- Cada cupom só pode ser usado uma vez por usuário
- Feedback visual: verde para cupom válido, vermelho para inválido ou já usado
- Cupons disponíveis:

| Cupom | Desconto |
|-------|----------|
| `BEMVINDO10` | 10% de desconto |
| `FRETE20` | 20% de desconto |
| `VERAO15` | 15% de desconto |
| `BLACK30` | 30% de desconto |
| `PROMO50` | R$ 50,00 de desconto |
| `VIP100` | R$ 100,00 de desconto |

### Modal de Checkout
- Abre ao clicar em **Finalizar Compra** no sidebar
- Exibe o total atualizado e campo para cupom de desconto
- Fechar pelo **×** ou confirmar com **Confirmar Pedido**, que deduz o saldo da carteira

### Carteira
- Saldo inicial de R$ 500,00 para todo usuário criado
- Exibido em tempo real no header e deduzido após cada compra confirmada
- Compra bloqueada com alerta se o saldo for insuficiente

### Após a Compra
- Popup de sucesso exibido por 3 segundos
- Carrinho limpo, modal fechado e totais zerados automaticamente

### Responsividade
- Layout adaptado para tablets e celulares
- Sidebar e modal em tela cheia em dispositivos móveis

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
    ├── carrinho.js   # Lógica de adição/remoção de itens, controle de quantidade e sidebar
    ├── cupom.js      # Lógica de cupons de desconto com histórico por usuário
    └── wallet.js     # Gerenciamento de saldo: exibição em tempo real, validação e dedução ao confirmar pedido
```

## Como Usar

1. Clone o repositório e abra `login.html` direto no navegador (sem necessidade de servidor)
2. Crie uma conta com e-mail válido e senha nos padrões exigidos — o login automático ativa após o cadastro
3. Na vitrine, clique em **Comprar** para adicionar itens; total e saldo aparecem em tempo real no header
4. Abra o sidebar pelo ícone do carrinho, ajuste quantidades e clique em **Finalizar Compra**
5. No modal, aplique um cupom (opcional) e confirme o pedido
6. Um popup de sucesso confirma a compra; carrinho e saldo são atualizados na hora
7. Clique em **Log Out** para encerrar a sessão

## Tecnologias

- HTML5
- CSS3 (Grid Layout, Flexbox, Media Queries)
- JavaScript ES6+
- LocalStorage API
- [Fake Store API](https://fakestoreapi.com)

## Observações

- Projeto sem backend — todos os dados ficam no `localStorage` do navegador
- As senhas são armazenadas com hash SHA-256 no `localStorage`; ainda assim, **não use senhas reais**
- Requer conexão com a internet para carregar os produtos da API externa
