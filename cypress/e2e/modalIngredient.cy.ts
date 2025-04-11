/// <reference types="cypress" />

describe('Modal - opening, and ingredient details', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit('http://localhost:5173');
    });
  
    it('Modal is opened after clicking ingredient card', () => {
      cy.get('[data-testid="ingredient-card"]').last().click();
      cy.get('[data-testid="modal"]').should('be.visible');  // Модалка открыта
    });
    
    it('Ingredients details are shown in opened modal', () => {
        cy.get('[data-testid="ingredient-card"]').last().click();
        cy.get('[data-testid="modal"]').should('be.visible');  // Модалка открыта
        cy.get('[data-testid="ingredient-details"]').should('be.visible');  // Модалка открыта
    });
  });
  