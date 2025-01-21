describe('Testare export PDF fără examene disponibile', () => {
    it('Ar trebui să afișeze un mesaj de eroare dacă nu există examene disponibile', () => {
        // Navighează la pagina de autentificare
        cy.visit('http://127.0.0.1:8000/login');
        cy.viewport(1920, 1080);

        cy.get('input#email').type('jane@example.com');
        cy.get('input#password').type('password123');
        cy.get('button[type="submit"]').click();

        // Click pe butonul pentru "Pagini" pentru a deschide meniul dropdown
        cy.get('button[aria-controls="dropdown-pages"]').click();

        // Selectează link-ul către pagina "Exams" din meniul dropdown
        cy.contains('a', 'Examene').click();

        // Verifică redirecționarea către pagina Exams
        cy.url().should('include', '/exams');

        // Verifică existența butonului Download PDF
        cy.get('button').contains('Download PDF').should('be.visible');

        // Apasă pe butonul Download PDF
        cy.get('button').contains('Download PDF').click();

        // Verifică afișarea notificării de eroare
        cy.get('#toast-error')
          .should('be.visible') // Verifică dacă notificarea este vizibilă
          .and('contain.text', 'No exams available for export.'); // Verifică textul notificării
    });
});