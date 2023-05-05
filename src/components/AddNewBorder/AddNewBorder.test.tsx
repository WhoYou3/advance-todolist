import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBorderForm from "./NewBorderForm";

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    closeBoardForm: jest.fn(),
  }),
}));

describe("New Border component", () => {
  let mockCloseBoardForm: jest.MockedFunction<() => void>;
  // let mockUseAuth: jest.MockedFunction<() => AuthContextValue | null>;
  beforeEach(() => {
    mockCloseBoardForm = jest.fn();
  });
  it("Add new border function should be called after clicked button", async () => {
    render(<NewBorderForm />);
    const borderInput = screen.getByRole("textbox");
    const buttonSubmit = screen.getByRole("button");

    userEvent.type(borderInput, "Example Border");
    await userEvent.click(buttonSubmit);
    expect(mockCloseBoardForm).toHaveBeenCalledTimes(1);
    screen.logTestingPlaygroundURL();
  });
});
