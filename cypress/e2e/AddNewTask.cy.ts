import { generateRandomString } from "../support/commands";

/// <reference types="Cypress"/>

const randomString = generateRandomString(6);

const exampleTask = {
  title: randomString,
  description: "Example task description",
};

describe("Add todos variable", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("przykladowe123", "Przyklad123@gmail.com");
  });
  it("Add TODO", () => {
    cy.get("[data-testid='borders-list'] li").first().click();
    cy.get("[data-testid='borders-list'] li")
      .first()
      .parent()
      .should("have.class", "selected");
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
    cy.get('[data-testid="todo-tasks-list"] li')

      .its("length")
      .then((length) => {
        cy.get("li")
          .last()
          .within(() => {
            cy.get("p").eq(0).should("have.text", exampleTask.title);
          });
      });
  });
});
