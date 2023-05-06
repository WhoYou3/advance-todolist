/// <reference types="Cypress"/>

describe("Valid Login and register form", () => {
  beforeEach(() => {
    cy.clearAllSessionStorage();
  });
  it("valid Login", () => {
    cy.visit("/");
    cy.get('[data-testid="email"]').type("Przyklad123@gmail.com");
    cy.get('[data-testid="password"]').type("przykladowe123");
    cy.get("button").click();
    cy.wait(1000); // waiting for logging
    cy.window().then((win) => {
      const storage = win.sessionStorage.getItem("id");
      cy.wrap(storage).should("exist");
      cy.url().should("include", storage);
    });
  });
  it("valid registration", () => {
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=*"
    ).as("RegisterUser");
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC8PSKbX9LZFZuCz0v2fHWNFhtsbLZr5IU"
    ).as("RegisterToFirebase");
    cy.intercept("POST", "");
    cy.visit("/");
    cy.get("span").click();
    cy.get("h2").should("have.text", "Registration");
    cy.get('[data-testid="email"]').type("testuje12345678@gmail.com");
    cy.get('[data-testid="password"]').type("testujehaslo");
    cy.get('[data-testid="repeat-password"]').type("testujehaslo");
    cy.get("button").click();
    cy.wait("@RegisterUser").then((interception) => {
      expect(interception.request.body.email).to.equal(
        "testuje12345678@gmail.com"
      );
      expect(interception.request.body.password).to.equal("testujehaslo");
    });
  });
});
