describe('Admin - Acceptare Evaluare', () => {
    it('Ar trebui să accepte evaluarea cu setarea start/end și sala', () => {
        // Navighează la pagina de autentificare
        cy.visit('http://127.0.0.1:8000/login');
        cy.viewport(1920, 1080);

        cy.get('input#email').type('john@example.com');
        cy.get('input#password').type('password123');
        cy.get('button[type="submit"]').click();

        // Verifică redirecționarea către dashboard
        cy.url().should('eq', 'http://127.0.0.1:8000/dashboard');

        // Navighează la pagina "Evaluări în așteptare"
        cy.visit('http://127.0.0.1:8000/evaluations/pending');

        // Apasă pe butonul "Accept" pentru o evaluare specifică
        cy.get('button').contains('Accept').click(); // Se presupune că evaluarea cu ID-ul 4 este disponibilă

        // Completează timpul de start
        cy.get('input#start_time').type('09:00');

        // Completează timpul de sfârșit
        cy.get('input#end_time').type('11:00');

        // Selectează o sală
        cy.get('select#room_id').select('C001'); // Alege sala C001 din lista derulantă

        // Opțional: Verifică disponibilitatea
        cy.get('button#checkAvailabilityBtn').click();

        // Trimite formularul de acceptare
        cy.get('button#acceptSubmitBtn').click();

        // Verifică dacă utilizatorul este redirecționat la aceeași pagină
        cy.url().should('eq', 'http://127.0.0.1:8000/evaluations/pending');
    });
});
