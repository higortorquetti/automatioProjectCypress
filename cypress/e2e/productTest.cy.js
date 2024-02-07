import * as dados from "../support/constantes";

describe('Testes na pagina de produtos', () => {
    beforeEach(() => {
        cy.login(dados.emailValido, dados.senhaValida);
    });

    it('Testa se a pagina de produtos e detalhes do produtos está sendo exibida corretamente.', () => {
        //clica no botão produto no menu superior
        cy.get('a[href="/products"]').click();
        cy.url('eq', 'https://automationexercise.com/products');
        
        //verifica se os produtos estão sendo exibidos
        cy.contains('All Products').should('be.visible');
        cy.get('div[class="col-sm-4"]').should('have.length', 35);

        //clica em view product e verifica se os detalhes do produto estão sendo exibidos
        cy.get('a[href="/product_details/1"]').click();
        cy.url().should('eq', 'https://automationexercise.com/product_details/1');
        cy.get('img[src="/get_product_picture/1"]').should('be.visible');
        cy.get('div[class="product-information"]').should('be.visible');
        cy.get('div[class="product-information"] h2').should('have.text', 'Blue Top');
        cy.get('div[class="product-information"] span span').should('have.text', 'Rs. 500');

    });

    it('Verifica a se busca esta retornando corretamente os produtos', () => {
        //clica no botão produto no menu superior
        cy.get('a[href="/products"]').click();
        cy.url('eq', 'https://automationexercise.com/products');
        
        //verifica se os produtos estão sendo exibidos
        cy.contains('All Products').should('be.visible');
        cy.get('div[class="col-sm-4"]').should('have.length', 35);

        //faz uma busca por um produto ou tipo de produto desejado
        cy.get('#search_product').type(`${dados.buscaProduto}`);
        cy.get('#submit_search').click();
        cy.url().should('eq', `https://automationexercise.com/products?search=${dados.buscaProduto}`);
        
        //verifica se os produtos exibidos contém o que foi buscado no título
        cy.get('div.productinfo.text-center').each(($div) => {
            cy.wrap($div).find('p').should('contain', `${dados.buscaProduto}`);
        });
    });

});