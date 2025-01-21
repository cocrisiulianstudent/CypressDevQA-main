describe('Nav-Bar Tests', () => {
  beforeEach(() => {
    // Setăm rezoluția browserului și accesăm pagina principală înainte de fiecare test
    cy.viewport(1920, 1080);
    cy.visit('http://127.0.0.1:8000/');
  });

  it('Navigate to Home and verify the URL', () => {
    cy.get('a').contains('Home').click(); // Găsește linkul "Home" și face click
    cy.url().should('eq', 'http://127.0.0.1:8000/'); // Verifică URL-ul
  });

  it('Navigate to Features and verify the URL', () => {
    cy.get('a').contains('Features').click(); // Găsește linkul "Features" și face click
    cy.url().should('eq', 'http://127.0.0.1:8000/features'); // Verifică URL-ul
  });

  it('Navigate to Contact and verify the URL', () => {
    cy.get('a').contains('Contact').click(); // Găsește linkul "Contact" și face click
    cy.url().should('eq', 'http://127.0.0.1:8000/contact'); // Verifică URL-ul
  });

  it('Navigate to Sign In and verify the URL', () => {
    cy.get('a').contains('Sign In').click(); // Găsește linkul "Sign In" și face click
    cy.url().should('eq', 'http://127.0.0.1:8000/login'); // Verifică URL-ul
  });
});
