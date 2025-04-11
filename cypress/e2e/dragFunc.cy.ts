/// <reference types="cypress" />

describe("Drag'n'drop", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit('');
    });
  
    it('Moves bun', () => {
      cy.moveIngredients(0, true);
    });
    
    it('Moves sauce', () => {
      cy.moveIngredients(3);
    });
    
    it('Moves main ingredients', () => {
      cy.moveIngredients(10);
    });
});
  
