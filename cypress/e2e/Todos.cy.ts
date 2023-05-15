import { generateRandomString } from "../support/commands";

/// <reference types="Cypress"/>

const randomString = generateRandomString(6);

const exampleTask = {
  title: randomString,
  description: "Example task description",
};

describe("Todos posibilites", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("przykladowe123", "Przyklad123@gmail.com");
    cy.get("[data-testid='borders-list'] li").first().click();
    cy.get("[data-testid='borders-list'] li")
      .first()
      .parent()
      .should("have.class", "selected");
  });
  it("Add TODO, and mark it as pending and done", () => {
    cy.get('[data-testid="add-new-task"]').click();
    cy.get('[data-testid="new-task-form"]').as("newTaskForm").should("exist");
    cy.get("@newTaskForm").within(() => {
      cy.get("input#Title").type(exampleTask.title);
      cy.get("textarea#Description").type(exampleTask.description);
      cy.get("input#subtasks").eq(0).type("first subtask");
      cy.get("input#subtasks").eq(1).type("second subtask");
      cy.contains("button", "Add New Subtask").click();
      cy.get("input#subtasks").eq(2).type("third subtask");
      cy.contains("button", "Create Task").click();
    });
    cy.wait(1000); // wait for add new task
    cy.get('[data-testid="sidebar-toggle"]').as("sidebarToggle").click();
    cy.get('[data-testid="todo-tasks-list"]').within(() => {
      cy.get("li").last().as("addedTask").should("contain", exampleTask.title);
    });
    cy.get("@addedTask").click();
    cy.get('[data-testid="task-detail"]')
      .first()
      .within(() => {
        cy.get("input").first().check({ force: true });
      });
    cy.contains("button", 'Add to "PENDING"')
      .should("be.enabled")
      .click({ force: true });
    cy.wait(1000);
    cy.get('[data-testid="pending-tasks-list"]').within(() => {
      cy.get("li").last().should("contain", exampleTask.title).click();
    });
    cy.get('[data-testid="task-detail"]')
      .first()
      .within(() => {
        cy.get("input").not(":first").click({ force: true, multiple: true });
      });
    cy.contains("button", 'Add to "DONE"')
      .should("be.enabled")
      .click({ force: true });
    cy.wait(1000);
    cy.logout();
  });
});
