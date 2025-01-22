describe('Verificare acces utilizator fără drepturi la pagina /users', () => {
    it('Ar trebui să returneze 403 pentru utilizator fără roluri corespunzătoare', () => {
        // Navighează la pagina de autentificare
        cy.visit('http://127.0.0.1:8000/login');
        cy.viewport(1920, 1080);
        cy.get('input#email').type('jane@example.com');
        cy.get('input#password').type('password123');
        cy.get('button[type="submit"]').click();

        // Verifică redirecționarea către dashboard (sau altă pagină implicită)
        cy.url().should('eq', 'http://127.0.0.1:8000/dashboard');

        // Încearcă să acceseze pagina /users
        cy.request({
            url: 'http://127.0.0.1:8000/users',
            failOnStatusCode: false, // Nu oprește testul dacă răspunsul este diferit de 2xx
        }).then((response) => {
            // Verifică dacă răspunsul HTTP este 403
            expect(response.status).to.eq(403);

            // Verifică dacă mesajul de eroare este "User does not have the right roles."
            cy.visit('http://127.0.0.1:8000/users', { failOnStatusCode: false });
            cy.contains('User does not have the right roles.').should('be.visible');
        });
    });
});
