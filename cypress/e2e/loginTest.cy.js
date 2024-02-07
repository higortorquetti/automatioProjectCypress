import * as dados from "../support/constantes";

describe('Teste na página de login e Signup', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Login com credênciais válidas em seguida o Logout',() => {
        //verifica se a pagina é a esperada
        cy.url().should('eq', 'https://automationexercise.com/');
 
        //navega até a página de login/Signup
        cy.get('li a[href="/login"]').click();
        cy.url().should('eq', 'https://automationexercise.com/login');
        
        //efetua o login com credênciais válidas e o logout em seguida
        cy.login(dados.emailValido, dados.senhaValida);
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.get('a[href="/logout"]').click();
        cy.url().should('eq', 'https://automationexercise.com/login');
    });
    
    it('Login com email inválido',() => {
        //verifica se a pagina é a esperada
        cy.url().should('eq', 'https://automationexercise.com/');
 
        //navega até a página de login/Signup
        cy.get('li a[href="/login"]').click();
        cy.url().should('eq', 'https://automationexercise.com/login');
        
        //tenta fazer o login com email inválida e verifica se a menssagem de erro é visível.
        cy.login(dados.emailInvalido1, dados.senhaValida);
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });
    
    it('Login com senha inválida', () => {
        //verifica se a pagina é a esperada
        cy.url().should('eq', 'https://automationexercise.com/');
 
        //navega até a página de login/Signup
        cy.get('li a[href="/login"]').click();
        cy.url().should('eq', 'https://automationexercise.com/login');
        
        //tenta fazer o login com senha inválida e verifica se a menssagem de erro é visível. 
        cy.login(dados.emailValido, dados.senhaInvalida);
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Criar um novo usuário com email já existente',() => {
         //verifica se a pagina é a esperada
         cy.url().should('eq', 'https://automationexercise.com/');
 
         //navega até a página de login/Signup
         cy.get('li a[href="/login"]').click();
         cy.url().should('eq', 'https://automationexercise.com/login');
        
        //preenche os campos para o signup com email já existente 
        // e veririca se a menssagem se a menssagem está visível 
        cy.get('input[data-qa="signup-name"]').type(`${dados.name}`);
        cy.get('input[data-qa="signup-email"]').type(`${dados.emailValido}`);
        cy.get('button[data-qa="signup-button"]').click();
        cy.contains('Email Address already exist!').should('be.visible');
    });

});