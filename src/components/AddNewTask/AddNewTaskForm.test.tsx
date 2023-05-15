import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddNewTaskForm from "./AddNewTaskForm";

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(() => ({
    theme: "light",
    setBoardTask: jest.fn(),
    closeTaskForm: jest.fn(),
    currentUserData: {
      boards: [],
    },
  })),
}));

jest.mock("firebase/firestore", () => {
  const actualFirestore = jest.requireActual("firebase/firestore");
  return {
    ...actualFirestore,
    doc: jest.fn(),
    updateDoc: jest.fn(),
    getDoc: jest
      .fn()
      .mockResolvedValue({ data: jest.fn().mockReturnValue({}) }),
  };
});

describe("AddNewTaskForm", () => {
  test("should submit form with task data", async () => {
    render(<AddNewTaskForm />);

    // Fetch elements
    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");
    const addButton = screen.getByRole("button", { name: /add new subtask/i });
    const submitButton = screen.getByRole("button", { name: /create task/i });

    // Fill form
    fireEvent.change(titleInput, { target: { value: "Example Title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Example Description" },
    });

    // Add subtask
    fireEvent.click(addButton);
    const subtaskInput = screen.getByLabelText("Subtasks");
    fireEvent.change(subtaskInput, { target: { value: "Example Subtask" } });

    // Send Form
    fireEvent.click(submitButton);

    // Check if correct function has been called
    expect(doc).toHaveBeenCalled();
  });
});
