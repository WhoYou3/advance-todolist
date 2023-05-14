import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBorderForm from "./NewBorderForm";
import { useAuth } from "../../context/AuthContext";

// Mock the external resources
jest.mock("../../context/AuthContext");
jest.mock("firebase/firestore");
jest.mock("../../App");

describe("NewBorderForm", () => {
  let closeBoardFormMock: jest.Func;

  beforeEach(() => {
    // Mock the functions
    closeBoardFormMock = jest.fn();

    // Mock the implementation of useAuth to return the mock function
    (useAuth as jest.Mock).mockImplementation(() => ({
      closeBoardForm: closeBoardFormMock,
    }));
  });

  it("Add new border function should be called after clicked button", async () => {
    render(<NewBorderForm />);
    const borderInput = screen.getByRole("textbox");
    const buttonSubmit = screen.getByRole("button", { name: /create border/i });

    await userEvent.type(borderInput, "Example Border");
    await userEvent.click(buttonSubmit);

    expect(closeBoardFormMock).toHaveBeenCalled();
  });
});
