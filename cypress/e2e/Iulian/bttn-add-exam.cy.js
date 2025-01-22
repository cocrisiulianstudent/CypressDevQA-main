describe('Verificare vizibilitate buton "Adaugă" pentru utilizatori diferiți', () => {
    it('Butonul "Adaugă" NU trebuie să fie vizibil pentru utilizatorii obișnuiți (student fără drepturi)', () => {
        // Navigăm la pagina principală ca utilizator obișnuit
        cy.visit('http://127.0.0.1:8000/login');
        cy.viewport(1920, 1080);

        // Introducem credențialele utilizatorului obișnuit
        cy.get('input#email').type('jana@example.com'); // Email utilizator obișnuit
        cy.get('input#password').type('password123'); // Parola
        cy.get('button[type="submit"]').click();

        // Verificăm dacă utilizatorul este redirecționat pe dashboard
        cy.url().should('eq', 'http://127.0.0.1:8000/dashboard');

        // Navigăm către pagina de calendar
        cy.visit('http://127.0.0.1:8000/calendar');

        // Verificăm că butonul "Adaugă" NU este vizibil
        cy.contains('button', 'Adauga').should('not.exist');
    });

    it('Butonul "Adaugă" TREBUIE să fie vizibil pentru șefii de grupă / administratori', () => {
        // Navigăm la pagina principală ca utilizator șef de grupă
        cy.visit('http://127.0.0.1:8000/login');

        // Introducem credențialele utilizatorului șef de grupă
        cy.get('input#email').type('john@example.com'); // Email șef de grupă
        cy.get('input#password').type('password123'); // Parola
        cy.get('button[type="submit"]').click();

        // Verificăm dacă utilizatorul este redirecționat pe dashboard
        cy.url().should('eq', 'http://127.0.0.1:8000/dashboard');

        // Navigăm către pagina de calendar
        cy.visit('http://127.0.0.1:8000/calendar');
        cy.wait(500); // Așteptăm 500ms pentru a se încărca pagina
        // Verificăm că butonul "Adaugă" este vizibil
        cy.contains('button', 'Adauga').should('be.visible');
    });
});