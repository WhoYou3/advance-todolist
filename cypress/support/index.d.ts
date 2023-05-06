declare namespace Cypress {
  interface Chainable {
    login(password: string, email: string): Chainable<Element>;
  }
}
