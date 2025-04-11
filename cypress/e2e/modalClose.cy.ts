/// <reference types="cypress" />

describe('Modal - closing', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('');
  });

  it('Modal is closed after clicking X button', () => {
    cy.openIngredientModal(4);

    cy.get('[data-testid="close-btn"]').click();
    cy.checkModalIsClosed();  
  });
  
  it('Modal is closed after clicking on overlay', () => {
    cy.openIngredientModal(0);  
    
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.checkModalIsClosed();  
  });
  
  it('Modal is closed after clicking ESC button', () => {
    cy.openIngredientModal(8);
    
    cy.get('body').trigger('keydown', { key : "Escape"});
    cy.checkModalIsClosed();  
  });
});
