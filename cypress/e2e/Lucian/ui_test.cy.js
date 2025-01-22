describe('Test de UI pentru aplicația TODO', () => {
  beforeEach(() => {
    // Log in before any test runs
    cy.visit('http://127.0.0.1:8000/login'); // Adjust the URL to your login page
    cy.get('input[name="email"]').type('andrei.croitoriu@student.usv.ro');
    cy.get('input[name="password"]').type('andreicroitoriu');
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', 'http://127.0.0.1:8000/login');
  }
)
it('should toggle Light/Dark Mode', () => {
  // Navighează la pagina principală
  cy.visit('http://127.0.0.1:8000/dashboard');

  // Verifică dacă modul inițial este Light
  cy.get('html').should('not.have.class', 'dark');

  // Activează Dark Mode folosind label-ul
  cy.get('label[for="theme-toggle"]').click();

  // Adaugă un delay pentru a observa tranziția
  cy.wait(2000); // Așteaptă 2 secunde

  // Verifică dacă modul Dark este activ
  cy.get('html').should('have.class', 'dark');

  // Dezactivează Dark Mode
  cy.get('label[for="theme-toggle"]').click();

  // Adaugă un alt delay pentru a observa tranziția
  cy.wait(2000); // Așteaptă 2 secunde

  // Verifică dacă modul Light este activ
  cy.get('html').should('not.have.class', 'dark');
});

  
});
