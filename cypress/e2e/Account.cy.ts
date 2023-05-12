/// <reference types="Cypress"/>

describe("Account validation, login, logout, registration", () => {
  beforeEach(() => {
    // cy.clearAllSessionStorage();

    cy.visit("/");
  });
  it("valid Login and logout", () => {
    cy.login("przykladowe123", "Przyklad123@gmail.com");
    cy.logout();
  });
  it("valid registration", () => {
    cy.intercept({
      method: "POST",
      url: " https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=*",
    }).as("registerUser");

    cy.get("span").click();
    cy.get("h2").should("have.text", "Registration");
    cy.get('[data-testid="email"]').type("Przyklad123@gmail.com");
    cy.get('[data-testid="password"]').type("przykladowe123");
    cy.get('[data-testid="repeat-password"]').type("przykladowe123");
    cy.get("button").click();
    cy.wait("@registerUser").then((interception) => {
      expect(interception.request.body.email).to.equal("Przyklad123@gmail.com");
      expect(interception.request.body.password).to.equal("przykladowe123");
    });
  });
});
