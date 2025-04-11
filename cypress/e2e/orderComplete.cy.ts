/// <reference types="cypress" />

describe("Order complete, modal and order details show", () => {

    beforeEach(() => {
      const email = "trenneen@trenenen.tr";
      const password = "trentre344g4rgn";
      cy.intercept ("POST", "/api/auth/login", { fixture: "login.json" } ).as("login");
      cy.intercept ("POST", "/api/orders", { fixture: "order.json" } ).as("order");
      cy.viewport(1920, 1080);
      cy.visit('');
      
      cy.get('[data-testid="order-btn"]').as('orderBtn');

      cy.get('@orderBtn').click(); 
      cy.get('[data-testid="email-input"]').type(`${email}`);
      cy.get('[data-testid="password-input"]').type(`${password}`);
      cy.get('[data-testid="login-submit"]').click();
      
      cy.wait('@login');
    });
    
    it('Opens modal with order details', () => {
      cy.moveIngredients(0, true);
      cy.get('@orderBtn').click(); 
      cy.wait('@order');
      cy.get('[data-testid="modal"]').should('be.visible'); 
      cy.get('[data-testid="order-code"]', { timeout: 20000 }).should('be.visible'); 
    });
  });
