import * as dados from "../support/constantes";

Cypress.Commands.add('preencherFormulario', () => {
    cy.get('#id_gender1').check();
    cy.get('#password').type(`${dados.password}`);
    cy.get('#days').select(12);
    cy.get('#months').select('June');
    cy.get('#years').select('1999');
    cy.get('#newsletter').check();
    cy.get('#first_name').type(`${dados.name}`);
    cy.get('#last_name').type(`${dados.lastName}`);
    cy.get('#address1').type(`${dados.adress}`);
    cy.get('#country').type(`${dados.country}`);
    cy.get('#state').type(`${dados.state}`);
    cy.get('#city').type(`${dados.city}`);
    cy.get('#zipcode').type(`${dados.zipCode}`);
    cy.get('#mobile_number').type(`${dados.phone}`);
});

Cypress.Commands.add('login', (email, senha) => {
    cy.visit('https://automationexercise.com/login');
    cy.get('input[data-qa="login-email"]').type(`${email}`);
    cy.get('input[data-qa="login-password"]').type(`${senha}`);
    cy.get('button[data-qa="login-button"]').click();
});

Cypress.Commands.add('adicionarProduto', (id) => {
    cy.get(`a[data-product-id="${id}"]`).eq(0).click();
    cy.get('div.modal-body p').contains('Your product has been added to cart.');
    cy.get('button[class="btn btn-success close-modal btn-block"]').click();
});