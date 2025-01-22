describe('Schimbarea parolei utilizatorului', () => {
    it('Ar trebui să permită utilizatorului să își schimbe parola din meniul "Autentificare"', () => {
        // Navigăm către pagina de login
        cy.visit('http://127.0.0.1:8000/login');
        cy.viewport(1920, 1080);

        // Introducem datele de autentificare și trimitem formularul
        cy.get('input#email').type('jane@example.com'); // Adresa de email
        cy.get('input#password').type('password123'); // Parola
        cy.get('button[type="submit"]').click(); // Apăsăm butonul de autentificare

        // Verificăm că utilizatorul este redirecționat către dashboard
        cy.url().should('include', '/dashboard');

        // Accesăm meniul "Autentificare"
        cy.get('button[aria-controls="dropdown-authentication"]').click();

        // Apăsăm pe linkul "Change Password"
        cy.get('a[href="http://127.0.0.1:8000/password/change"]').click();

        // Verificăm că suntem pe pagina de schimbare a parolei
        cy.url().should('include', '/password/change');

        // Completăm formularul de schimbare a parolei
        cy.get('input#current_password').type('password123'); // Parola curentă
        cy.get('input#new_password').type('newpassword123'); // Noua parolă
        cy.get('input#new_password_confirmation').type('newpassword123'); // Confirmarea noii parole

        // Apăsăm pe butonul "Change Password"
        cy.get('button[type="submit"]').contains('Change Password').click();

        cy.clearCookies();


        // Autentificare cu noua parolă
        cy.visit('http://127.0.0.1:8000/login');
        cy.get('input#email').type('jane@example.com'); // Adresa de email
        cy.get('input#password').type('newpassword123'); // Noua parolă
        cy.get('button[type="submit"]').click();

        // Verificăm că utilizatorul este redirecționat către dashboard
        cy.url().should('include', '/dashboard');
    });
});
