describe('Adăugare Examen', () => {
    it('Ar trebui să selecteze toate câmpurile și să adauge examenul', () => {
        // Navighează pe pagina de login și autentificare
        cy.visit('http://127.0.0.1:8000/login');
        cy.viewport(1920, 1080);
        cy.get('input#email').type('john@example.com');
        cy.get('input#password').type('password123');
        cy.get('button[type="submit"]').click();

        // Verifică redirecționarea către dashboard
        cy.url().should('eq', 'http://127.0.0.1:8000/dashboard');

        // Navighează către pagina de calendar
        cy.visit('http://127.0.0.1:8000/calendar');

        // Apasă pe butonul "Adauga"
        cy.get('button.fc-addExamButton-button').click();

        // Selectează o grupă
        cy.get('button').contains('data-title').click(); // Apasă pe dropdown
        cy.contains('3211 • AIA').click(); // Selectează opțiunea dorită

        // Selectează un subiect
        cy.get('button').contains('Alege un subiect...').click(); // Apasă pe dropdown
        cy.contains('Matematică').click(); // Selectează opțiunea dorită

        // Selectează un cadru didactic
        cy.get('button').contains('Alege un cadru didactic...').click(); // Apasă pe dropdown
        cy.contains('Profesor Popescu').click(); // Selectează opțiunea dorită

        // Selectează o sală
        cy.get('button').contains('Alege o sala...').click(); // Apasă pe dropdown
        cy.contains('Sala 101').click(); // Selectează opțiunea dorită

        // Selectează examinatori (dacă este necesar)
        cy.get('button').contains('Select multiple options...').click(); // Apasă pe dropdown
        cy.contains('Profesor Ionescu').click(); // Selectează opțiunea dorită
        cy.contains('Profesor Popescu').click(); // Selectează o altă opțiune
        cy.get('button').contains('Select multiple options...').click(); // Închide dropdown-ul

        // Completează câmpul pentru data și ora
        cy.get('input[type="datetime-local"]').type('2025-01-21T15:00');

        // Completează durata examenului
        cy.get('input[type="number"]').clear().type('120'); // Introduce durata examenului

        // Completează informații suplimentare
        cy.get('#wysiwyg-typography-example-exam div[contenteditable="true"]')
          .type('Examen semestrial important.');

        // Apasă pe butonul de adăugare
        cy.contains('Adauga').click();

        // Verifică mesajul de succes
        cy.contains('Examenul a fost adăugat cu succes').should('be.visible');
    });
});