/// <reference types="cypress" />

describe('Modal - opening, and ingredient details', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit('');
    });
  
    it('Modal is opened after clicking ingredient card', () => {
      cy.openIngredientModal(3);
    });
    
    it('Ingredients details are shown in opened modal', () => {
      cy.openIngredientModal(5);
      cy.get('[data-testid="ingredient-details"]').should('be.visible');  
    });
  });
  