describe('Navigare pe pagina 2 în lista de examene', () => {
    it('Navighează la pagina 2 a listei de examene', () => {
        // Accesează pagina de login și autentificare
        cy.visit('http://127.0.0.1:8000/login');
        cy.get('input[name="email"]').type('jane@example.com');
        cy.get('input[name="password"]').type('parola123');
        cy.get('button[type="submit"]').click();

        // Verifică redirecționarea către dashboard
        cy.url().should('include', '/dashboard');

        // Navighează la pagina /exams
        cy.visit('http://127.0.0.1:8000/exams');

        // Verifică că pagina conține tabela de examene
        cy.get('table').should('be.visible');

        // Verifică că există paginare
        cy.get('nav[aria-label="Page navigation example"]').should('be.visible');

        // Navighează la pagina 2
        cy.get('a[href*="page=2"]').first().click();

        // Verifică că URL-ul include pagina 2
        cy.url().should('include', 'page=2');

        // Confirmă că tabela este vizibilă pe pagina 2
        cy.get('table').should('be.visible');
    });
});
