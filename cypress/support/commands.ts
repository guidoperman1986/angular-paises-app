// Add the type declaration for the new command
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to get an element by its data-test attribute.
             * @param dataTestSelector - The value of the data-test attribute to select.
             * @example cy.getDataTest('submit-button')
             */
            getDataTest(dataTestSelector: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}

Cypress.Commands.add('getDataTest', (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`)
});

// It's good practice to add this export to make the file a module
export { };