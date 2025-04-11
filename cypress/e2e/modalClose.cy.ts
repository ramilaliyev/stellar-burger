/// <reference types="cypress" />

describe('Modal - closing', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:5173');
  });

  it('Modal is closed after clicking X button', () => {
    cy.get('[data-testid="ingredient-card"]').last().click();
    cy.get('[data-testid="modal"]').should('be.visible'); 

    cy.get('[data-testid="close-btn"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');  
  });

  it('Modal is closed after clicking on overlay', () => {
    cy.get('[data-testid="ingredient-card"]').first().click();
    cy.get('[data-testid="modal"]').should('be.visible');  

    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist'); 
  });

  it('Modal is closed after clicking ESC button', () => {
    cy.get('[data-testid="ingredient-card"]').first().click();
    cy.get('[data-testid="modal"]').should('be.visible');  

    cy.get('body').trigger('keydown', { key : "Escape"});
    cy.get('[data-testid="modal"]').should('not.exist');
  });
});
