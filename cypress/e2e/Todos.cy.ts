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
  // it("Add TODO", () => {
  //   cy.get('[data-testid="add-new-task"]').click();
  //   cy.get('[data-testid="new-task-form"]').as("newTaskForm").should("exist");
  //   cy.get("@newTaskForm").within(() => {
  //     cy.get("input#Title").type(exampleTask.title);
  //     cy.get("textarea#Description").type(exampleTask.description);
  //     cy.get("input#subtasks").eq(0).type("first subtask");
  //     cy.get("input#subtasks").eq(1).type("second subtask");
  //     cy.contains("button", "Add New Subtask").click();
  //     cy.get("input#subtasks").eq(2).type("third subtask");
  //     cy.contains("button", "Create Task").click();
  //   });
  //   cy.wait(1000); // wait for add new task
  //   cy.get('[data-testid="todo-tasks-list"] li')

  //     .its("length")
  //     .then(() => {
  //       cy.get("li")
  //         .last()
  //         .within(() => {
  //           cy.get("p").eq(0).should("have.text", exampleTask.title);
  //         });
  //     });
  // });
  it("Mark todo as pending and done", () => {
    cy.get('[data-testid="todo-tasks-list"] li').first().click({ force: true });
    cy.get('[data-testid="task-detail"]')
      .first()
      .within(() => {
        cy.contains("button", /add to "pending"/i)
          .as("pendingButton")
          .should("not.be.enabled");
        cy.get("input").first().click({ force: true });
        cy.get("@pendingButton").should("be.enabled");
        cy.get("@pendingButton").click({ force: true });
      });
    cy.get('[data-testid="pending-tasks-list" li').click();
  });
});
