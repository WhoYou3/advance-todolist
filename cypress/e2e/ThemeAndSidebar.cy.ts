/// <reference types='Cypress'/>

describe("Theme and Sidebar", () => {
  beforeEach(() => {
    // cy.clearAllSessionStorage();
    cy.visit("/");
  });
  it("Change theme and toggle sidebar", () => {
    cy.login("przykladowe123", "Przyklad123@gmail.com");
    cy.get('[data-testid="theme-toggle"]').as("changeTheme").click();
    cy.get("aside").should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
    cy.get("@changeTheme").click();
    cy.get("aside").should("have.css", "background-color", "rgb(43, 44, 55)");
    cy.get('[data-testid="sidebar-toggle"]').as("sidebarToggle").click();
    cy.get("aside").should("have.class", "cyIgQq");
    cy.get("@sidebarToggle").click();
    cy.get("aside").should("have.class", "cbRZgP");
    cy.logout();
  });
});
