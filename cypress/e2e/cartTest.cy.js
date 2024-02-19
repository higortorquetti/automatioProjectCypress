import * as dados from "../support/constantes";

describe('Testes com Carrinho', () => {
    beforeEach(() => {
        cy.login(dados.emailValido, dados.senhaValida);
    });

    it('Adiciona produtos ao carrinho', () => {
        //clica no botão produto no menu superior
        cy.get('a[href="/products"]').click();
        cy.url('eq', 'https://automationexercise.com/products');

        //adiciona três produtos ao carrinho 
        //adicionarProduto(id do produto)
        cy.adicionarProduto(1);
        cy.adicionarProduto(2);
        cy.adicionarProduto(3);

        // clica no botão carrinho no menu superior
        cy.get('ul li a[href="/view_cart"]').click();
        
        //verifica se existem 3 produtos no carrinho
        cy.get('tr').should('have.length', 4);

        let sum = 0;
        //verifica se quantidade de cada produto é a esperada
        cy.get('td.cart_quantity').each(($td) => {
            const value = parseInt($td.text(), 10);
            sum += value;
        }).then(() => {
            expect(sum).to.equal(3)
        });
    });

    it('Adiciona produtos no carrinho, efetua o pedido', () => {
        //clica no botão produto no menu superior
        cy.get('a[href="/products"]').click();
        cy.url('eq', 'https://automationexercise.com/products');

        //adiciona três produtos ao carrinho 
        //adicionarProduto(id do produto)
        cy.adicionarProduto(1);
        cy.adicionarProduto(2);
        cy.adicionarProduto(3);

        // clica no botão carrinho no menu superior
        cy.get('ul li a[href="/view_cart"]').click();
        
        //clica no botão para fazer o checkout do pedido
        cy.get('a[class="btn btn-default check_out"]').click();

        //click no botão de fazer o pedido
        cy.get('a[href="/payment"]').click();

        //preenche os dados do cartão de credito e confirma o pedido
        cy.get('input[data-qa="name-on-card"]').type(dados.nomeDoCartao);
        cy.get('input[data-qa="card-number"]').type(dados.numeroDoCartao);
        cy.get('input[data-qa="cvc"]').type(dados.cvcDoCartao);
        cy.get('input[data-qa="expiry-month"]').type(dados.dataMesExpericao);
        cy.get('input[data-qa="expiry-year"]').type(dados.dataAnoExpericao);
        cy.get('button[data-qa="pay-button"]').click();

        //verifica se o pedido foi feito com sucesso
        cy.contains('Order Placed!').should('be.visible');
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');


    });
});