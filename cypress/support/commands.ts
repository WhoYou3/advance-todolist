/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("login", (password: string, email: string) => {
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get("button").click();
  cy.wait(1000); // waiting for logging
  cy.window().then((win) => {
    const storage = win.sessionStorage.getItem("id");
    cy.wrap(storage).should("exist");
    cy.url().should("include", storage);
  });
});

Cypress.Commands.add("newBorder", (randomString: string) => {
  let countBorder: number;
  let borderLength: number;
  cy.get("[data-testid='borders-list'] li").as("countListElements");
  cy.get("@countListElements")
    .its("length")
    .then((length) => {
      borderLength = length;
    });

  cy.get('[ data-testid="count-borders"')
    .invoke("text")
    .then((text) => {
      let textValue = text.match(/\d+/);
      if (textValue) {
        countBorder = parseInt(textValue[0], 10);
      }

      expect(countBorder + 1).eq(borderLength); // +1 because in ul is last element li
    });

  cy.get('[data-testid="add-new-border"]').click();
  cy.get('[data-testid="new-border-form"]').within(() => {
    cy.get("input").type(randomString);
    cy.get("button").click();
  });
});

export const generateRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const randomString = generateRandomString(6);
console.log(randomString);
