import * as dados from "../support/constantes";

describe(' Test contact us', () => {

    it(' Envia uma menssagem de suporte através do formulário contact us', () => {
        //acessa o site e efetua o login com credenciais validas
        cy.login(dados.emailValido, dados.senhaValida);

        //efetua login com credênciais válidas.
        cy.url().should('eq', 'https://automationexercise.com/');

        // navega até a página contact us
        cy.get('a[href="/contact_us"]').click();
        cy.url().should('eq', 'https://automationexercise.com/contact_us');

        //preenche os dados para o envio do formulário e faz o envio.
        cy.get('input[data-qa="name"]').type(`${dados.name}`);
        cy.get('input[data-qa="email"]').type(`${dados.emailValido}`);
        cy.get('input[data-qa="subject"]').type('test Conctac us');
        cy.get('#message').type('test');
        cy.get('input[name="upload_file"]').selectFile('./cypress/fixtures/contactUs.text');
        cy.get('input[data-qa="submit-button"]').click();

        // verifica se a menssagem de envio com sucesso é visível
        cy.get('div[class="status alert alert-success"]')
        .should('have.text', 'Success! Your details have been submitted successfully.');
    });
});