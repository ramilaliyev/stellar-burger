/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
      openIngredientModal(index: number): Chainable<Subject>;
      checkModalIsClosed(): Chainable<Subject>;
      moveIngredients(index: number, isBun?: boolean): Chainable<Subject>;
    }
}
  