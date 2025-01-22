describe('Creare cerere în Requests', () => {
    it('Creează o cerere cu profesor random și mesaj', () => {
        // Autentificare
        cy.visit('http://127.0.0.1:8000/login');
        cy.get('input[name="email"]').type('jane@example.com');
        cy.get('input[name="password"]').type('parola123');
        cy.get('button[type="submit"]').click();

        // Verifică că a fost redirecționat pe dashboard
        cy.url().should('include', '/dashboard');

        // Navighează la pagina /requests
        cy.visit('http://127.0.0.1:8000/requests');

        // Apasă pe butonul "Create Request"
        cy.get('a[href="http://127.0.0.1:8000/requests/create"]').click();

        // Verifică că a fost redirecționat pe pagina de creare a cererii
        cy.url().should('include', '/requests/create');

        // Alege un profesor random din lista de profesori
        cy.get('select[name="recipient_id"] option').then(($options) => {
            // Exclude prima opțiune (placeholder)
            const randomIndex = Math.floor(Math.random() * ($options.length - 1)) + 1;
            cy.get('select[name="recipient_id"]').select($options[randomIndex].value);
        });

        // Completează un mesaj random
        const mesajRandom = 'Acesta este un mesaj de test creat automat.';
        cy.get('textarea[name="content"]').type(mesajRandom);

        // Trimite cererea
        cy.get('button[type="submit"]').contains('Send Request').click();

        // Verifică dacă cererea apare în lista de Requests
        cy.visit('http://127.0.0.1:8000/requests');
        cy.contains(mesajRandom).should('be.visible');
    });
});
