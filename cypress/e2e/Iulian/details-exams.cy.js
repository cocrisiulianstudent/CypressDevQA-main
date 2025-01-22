describe('Verificarea detaliilor unui examen din calendar', () => {
    it('Ar trebui să afișeze detaliile examenului la clic pe un eveniment din calendar', () => {
        // Navigare la pagina principală
        cy.visit('http://127.0.0.1:8000/login');
        cy.viewport(1920, 1080);

        // Introducem credențialele utilizatorului obișnuit
        cy.get('input#email').type('jane@example.com');
        cy.get('input#password').type('password123');
        cy.get('button[type="submit"]').click();

        cy.visit('http://127.0.0.1:8000/calendar'); // Navigare la pagina principală

        // Găsește evenimentul în calendar
        cy.get('.fc-day-grid-event')
            .contains('exam: Psihologia educatiei') // Textul titlului examenului
            .should('be.visible') // Verificăm că examenul este afișat în calendar
            .click(); // Click pe eveniment pentru a afișa detaliile

        // Verificăm că modalul se deschide și selectăm modalul corect
        cy.get('.relative.bg-white.rounded-lg.h-auto')
            .should('be.visible') // Asigurăm că este vizibil
            .first() // Selectăm doar primul modal (în cazul în care există mai multe)
            .within(() => {
                // Verificăm detaliile afișate în modal
                cy.get('#event-title-info').should('have.text', 'Info examen'); // Titlul modalului
                cy.get('#event-evaluation-type-info').should('have.text', 'Psihologia educatiei'); // Tipul evaluării
                cy.get('#event-subject-info').should('have.text', 'Psihologia educatiei'); // Subiectul
                cy.get('#event-room-info').should('have.text', 'C005'); // Sala
                cy.get('#event-group-info').should('have.text', 'Grupa 3111'); // Grupa
                cy.get('#event-teacher-info').should('have.text', 'Laura-Bianca Bilius'); // Profesor
                cy.get('#event-teacher-email').should('have.text', 'laura.bilius@usm.ro'); // Email profesor
                cy.get('#event-date-info').should('have.text', '20-01-2025\n15:09'); // Data și ora
                cy.get('#event-duration-info').should('have.text', '120 min'); // Durata
            });

        // Închidem modalul
        cy.get('[data-modal-hide="event-details-modal"]').click(); // Butonul de închidere

    });
});