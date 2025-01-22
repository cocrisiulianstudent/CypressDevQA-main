describe('Deconectarea utilizatorului', () => {
    it('Ar trebui să permită utilizatorului să se deconecteze din meniul "Autentificare"', () => {
        // Navigăm către pagina de login
        cy.visit('http://127.0.0.1:8000/login');
        cy.viewport(1920, 1080);

        // Introducem datele de autentificare și trimitem formularul
        cy.get('input#email').type('jane@example.com'); // Adresa de email
        cy.get('input#password').type('password123'); // Parola
        cy.get('button[type="submit"]').click(); // Apăsăm butonul de autentificare

        // Verificăm că utilizatorul este redirecționat către dashboard
        cy.url().should('include', '/dashboard');

        // Accesăm meniul "Autentificare"
        cy.get('button[aria-controls="dropdown-authentication"]').click();

        // Apăsăm pe linkul "Log Out"
        cy.get('a[href="http://127.0.0.1:8000/logout"]').click();

        cy.visit('http://127.0.0.1:8000/login');

        // Verificăm că utilizatorul este redirecționat către pagina de login
        cy.url().should('include', '/login');

        // Verificăm că apare formularul de autentificare
        cy.get('input#email').should('be.visible');
        cy.get('input#password').should('be.visible');
    });
});
