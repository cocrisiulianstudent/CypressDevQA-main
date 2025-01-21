describe('My Account Page Tests', () => {
    const baseUrl = 'http://127.0.0.1:8000';
    const loginData = {
      email: 'john@example.com',
      password: 'password123',
    };
  
    before(() => {
      // Vizitează pagina de login și autentifică utilizatorul
      cy.viewport(1920, 1080);
      cy.visit(`${baseUrl}/login`);
      cy.get('input#email').type(loginData.email); // Introduce email-ul
      cy.get('input#password').type(loginData.password); // Introduce parola
      cy.get('button[type="submit"]').contains('Sign in').click(); // Apasă butonul "Sign In"
      cy.url().should('not.include', '/login'); // Verifică că autentificarea a reușit
    });
  
    it('Should Login to My Account and display user information', () => {
      // Click pe meniul utilizatorului pentru a deschide dropdown-ul
      cy.get('button#user-menu-button').click();

      cy.get('#user-dropdown')
      .should('be.visible')
      .within(() => {
        cy.contains(loginData.email).should('be.visible');
      });
    });
});