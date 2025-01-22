describe('Test navigare My Account prin navbar', () => {
    beforeEach(() => {
      // Log in înainte de fiecare test
      cy.visit('http://127.0.0.1:8000/login'); // Ajustează URL-ul
      cy.get('input[name="email"]').type('andrei.croitoriu@student.usv.ro');
      cy.get('input[name="password"]').type('andreicroitoriu');
      cy.get('button[type="submit"]').click();
  
      // Verifică redirecționarea către dashboard
      cy.url().should('include', '/dashboard');
    });
  
    it('should navigate to My Account when clicking the My Account option in the dropdown', () => {
        // Verifică dacă avatarul utilizatorului este prezent în navbar
        cy.get('#user-menu-button').should('exist');
        
        cy.wait(2000); // Așteaptă 2 secunde

        // Simulează clic pe avatar pentru a deschide meniul dropdown
        cy.get('#user-menu-button').click();
        
        cy.wait(2000); // Așteaptă 2 secunde

        // Verifică dacă meniul dropdown este afișat
        cy.get('#user-dropdown').should('be.visible');
        
        cy.wait(2000); // Așteaptă 2 secunde

        // Găsește opțiunea "My Account" și simulează clic pe ea
        cy.get('#user-dropdown').click();

        cy.wait(2000); // Așteaptă 2 secunde

      
        // Verifică dacă URL-ul actual este cel al paginii „My Account”
        cy.url().should('eq', 'http://127.0.0.1:8000/user/my-account');
      
        // Verifică dacă pagina afișează detaliile utilizatorului (de exemplu, emailul)
        cy.contains('andrei.croitoriu@student.usv.ro').should('exist');
      });
      
      
      
  });
  