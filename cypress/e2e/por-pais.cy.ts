describe('PorPaisComponent', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should create', () => {
        
        cy.get('app-por-pais').should('exist');
    });

    it('should display the title "By Country"', () => {
        
        cy.getDataTest('by-country').should('contain', 'By Country');
    });

    // E2E Test Examples
    it('should search for a country and display results', () => {
        
        cy.getDataTest('country-search-input').type('Argentina');
        cy.wait(500); // Wait for suggestions to load
        cy.getDataTest('suggestions-list').within(() => {
            cy.get('li').should('have.length.greaterThan', 0);
            cy.get('li').first().should('contain', 'Argentina');
            cy.get('li').first().click();

            cy.url().should('include', '/pais/ARG');
        });
    });

    it('should navigate to country details when clicking a result', () => {
        
        cy.getDataTest('country-search-input').type('Argentina').type('{enter}');
        cy.get('app-pais-table tbody tr').its(0).within((data) => {
            console.log('data', data);
            cy.getDataTest('go-button').click();
            cy.url().should('include', '/pais/ARG');
        });
    });

    it('should show error message for invalid country', () => {
        
        cy.getDataTest('country-search-input').type('InvalidCountry').type('{enter}');
        cy.wait(500);
        cy.getDataTest('suggestions-list').within(() => {
            cy.get('li').should('have.length', 1);
        });
    });


});