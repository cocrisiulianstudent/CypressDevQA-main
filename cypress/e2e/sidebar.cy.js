describe('Testare navigare prin side-bar', () => {
    it('Ar trebui să acceseze toate secțiunile din meniul lateral', () => {
      // Accesarea paginii de login
      cy.visit('http://127.0.0.1:8000/login');
      cy.viewport(1920, 1080);
      // Introducerea credențialelor și autentificarea
      cy.get('input#email').type('john@example.com');
      cy.get('input#password').type('password123');
      cy.get('button[type="submit"]').click();

      // Verificarea redirecționării către dashboard
      cy.url().should('eq', 'http://127.0.0.1:8000/dashboard');

      // Navigarea către Dashboard
      cy.get('a[href="http://127.0.0.1:8000/dashboard"]').click();
      cy.url().should('eq', 'http://127.0.0.1:8000/dashboard');

      // Navigarea către Examene
      cy.get('button[aria-controls="dropdown-pages"]').click(); // Deschiderea meniului dropdown pentru "Pagini"
      cy.get('a[href="http://127.0.0.1:8000/exams"]').click(); // Click pe "Examene"
      cy.url().should('eq', 'http://127.0.0.1:8000/exams');

      // Navigarea către Calendar
      cy.get('button[aria-controls="dropdown-sales"]').click(); // Deschiderea meniului dropdown pentru "Calendar"
      cy.get('a[href="http://127.0.0.1:8000/calendar"]').click(); // Click pe "Calendar"
      cy.url().should('eq', 'http://127.0.0.1:8000/calendar');

      // Navigarea către Notificări - Mesaje
      cy.get('button[aria-controls="dropdown-requests-messages"]').click(); // Deschiderea meniului dropdown pentru "Notificări"
      cy.get('a[href="http://127.0.0.1:8000/inbox"]').click(); // Click pe "Messages"
      cy.url().should('eq', 'http://127.0.0.1:8000/inbox');

      // Navigarea către Contact Us
      cy.get('a[href="http://127.0.0.1:8000/contactus"]').click();
      cy.url().should('eq', 'http://127.0.0.1:8000/contactus');
  });
});