import * as dados from "../support/constantes";

describe('Criação de novo usuário', () => {
    it('Registra um novo usuário',() => {
        // acessa o site
        cy.visit('/');
        //verifica se a pagina é a esperada
        cy.url().should('eq', 'https://automationexercise.com/');

        //navega até a página de login/Signup
        cy.get('li a[href="/login"]').click();
        cy.url().should('eq', 'https://automationexercise.com/login');

        //preenche os campos para o signup
        cy.get('input[data-qa="signup-name"]').type(`${dados.name}`);
        cy.get('input[data-qa="signup-email"]').type(`${dados.email}`);

        //clica no botão signup
        cy.get('button[data-qa="signup-button"]').click();
        cy.url().should('eq', 'https://automationexercise.com/signup');

        //prenche todos dados do formulário de cadastro e registra o usuário
        cy.preencherFormulario();
        cy.get('button[data-qa="create-account"]').click();
        cy.get('h2[data-qa="account-created"]').should('be.visible');
        cy.get('a[data-qa="continue-button"]').click();

        //deleta a conta criada
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.get('a[href="/delete_account"]').click();
        cy.get('h2[data-qa="account-deleted"]').should('be.visible');
        cy.get('a[data-qa="continue-button"]').click();
        cy.url().should('eq', 'https://automationexercise.com/');
    });
});