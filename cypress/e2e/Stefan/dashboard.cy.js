describe('Adăugare task în Dashboard', () => {
    it('Adaugă un task valid', () => {
        cy.visit('http://127.0.0.1:8000/login');
        cy.get('input[name="email"]').type('jane@example.com');
        cy.get('input[name="password"]').type('parola123');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/dashboard');

        cy.get('button[data-modal-target="addTaskModal"]').click();
        cy.get('input[name="title"]').type('Test Task');
        cy.get('textarea[name="description"]').type('Aceasta este o descriere de test.');

        // Selectează un subiect aleatoriu
        cy.get('select[name="subject"] option')
            .not('[disabled]') // Exclude opțiunile dezactivate
            .then((options) => {
                const randomIndex = Math.floor(Math.random() * options.length); // Alege un index aleatoriu
                const randomOption = options[randomIndex]; // Obține opțiunea
                cy.get('select[name="subject"]').select(randomOption.value); // Selectează valoarea
                cy.log(`Am selectat subiectul: ${randomOption.text}`); // Log pentru depanare
            });

        cy.get('input[name="deadline"]').type('2025-01-24T14:30');
        cy.get('button[type="submit"]').contains('Save Task').click();

        cy.contains('Test Task').should('be.visible');
        cy.contains('Aceasta este o descriere de test.').should('be.visible');
    });
});
