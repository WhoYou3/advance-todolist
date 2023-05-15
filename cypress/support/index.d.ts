declare namespace Cypress {
  interface Chainable {
    login(password: string, email: string): Chainable<Element>;
    newBorder(randomString: string): Chainable<Element>;
    logout(): Chainable<Element>;
  }
}
