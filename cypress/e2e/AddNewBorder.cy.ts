import { generateRandomString } from "../support/commands";
/// <reference types="Cypress"/>

const randomString = generateRandomString(6);
describe("Add todos variable", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("przykladowe123", "Przyklad123@gmail.com");
  });
  it("Add TODO", () => {
    cy.newBorder(randomString);
  });
});
