describe('Test pentru protecție împotriva SQL Injection', () => {
    it('Ar trebui să respingă o încercare de injectare SQL', () => {
        // Navighează la pagina de autentificare
        cy.visit('http://127.0.0.1:8000/login');
        cy.viewport(1920, 1080);

        // Introducem un payload SQL în câmpul de email
        const sqlPayload = "' OR '1'='1'; --";

        // Completăm formularul cu payload-ul de SQL Injection
        cy.get('input#email').type(sqlPayload); // Câmpul de email
        cy.get('input#password').type('dummyPassword'); // Parola dummy
        cy.get('button[type="submit"]').click();

        // Verificăm că utilizatorul nu este autentificat
        cy.url().should('not.include', '/dashboard'); // Nu ar trebui să ajungă la pagina principală

    });

    it('Ar trebui să respingă injectarea SQL în câmpul de parolă', () => {
        // Navighează la pagina de autentificare
        cy.visit('http://127.0.0.1:8000/login');
        cy.viewport(1920, 1080);

        // Introducem un email valid și un payload SQL în câmpul de parolă
        const sqlPayload = "' OR '1'='1'; --";
        cy.get('input#email').type('jana@example.com'); // Email valid
        cy.get('input#password').type(sqlPayload); // Payload de SQL Injection
        cy.get('button[type="submit"]').click();

        // Verificăm că utilizatorul nu este autentificat
        cy.url().should('not.include', '/dashboard'); // Nu ar trebui să ajungă la pagina principală

        // Verificăm afișarea mesajului de eroare
        cy.contains('The provided credentials do not match our records.').should('be.visible');
    });
});
