/// <reference types="cypress" />

Cypress.Commands.add("openIngredientModal", (index) => {
    cy.get('[data-testid="ingredient-card"]').eq(index).click();
    cy.get('[data-testid="modal"]').should('be.visible');
});

Cypress.Commands.add("checkModalIsClosed", () => {
    cy.get('[data-testid="modal"]').should('not.exist'); 
});

Cypress.Commands.add("moveIngredients", (index, isBun = false) => {
    cy.get('[data-testid="ingredient-card"]').eq(index).trigger('dragstart');
    isBun ? cy.get('[data-testid="drop-target"]').first().trigger('drop') : cy.get('[data-testid="drop-target"]').last().trigger('drop') ;
});