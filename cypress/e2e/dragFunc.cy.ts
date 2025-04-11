/// <reference types="cypress" />

describe("Drag'n'drop", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit('http://localhost:5173');
    });
  
    it('Moves bun', () => {
      cy.get('[data-testid="ingredient-card"]').first().trigger('dragstart');
      cy.get('[data-testid="drop-target"]').first().trigger('drop');
    });

    it('Moves sauce', () => {
      cy.get('[data-testid="ingredient-card"]').eq(3).trigger('dragstart');
      cy.get('[data-testid="drop-target"]').last().trigger('drop');
    });

    it('Moves main ingredients', () => {
      cy.get('[data-testid="ingredient-card"]').last().trigger('dragstart');
      cy.get('[data-testid="drop-target"]').last().trigger('drop');
    });
});
  
