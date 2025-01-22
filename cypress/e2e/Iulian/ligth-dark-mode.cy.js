describe('Schimbarea temei aplicației', () => {
    it('Ar trebui să permită utilizatorului să schimbe între Light și Dark Mode', () => {
        // Navighează la pagina de autentificare
        cy.visit('http://127.0.0.1:8000/login');
        cy.viewport(1920, 1080);

        cy.get('input#email').type('jane@example.com');
        cy.get('input#password').type('password123');
        cy.get('button[type="submit"]').click();



        // Apăsăm pe butonul de schimbare a temei
        cy.get('label[for="theme-toggle"]').click();


        // Verificăm că tema s-a schimbat în Dark
        cy.get('html').should('have.class', 'dark', { timeout: 5000 });


        // Apăsăm din nou pe butonul de schimbare a temei
        cy.get('label[for="theme-toggle"]').click();

        // Verificăm că tema a revenit la Light
        cy.get('html').should('not.have.class', 'dark', { timeout: 5000 });

    });
});
