import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login form", () => {
  let mockKindFormFunction: jest.MockedFunction<() => void>;
  let mockUseNavigate: jest.MockedFunction<typeof useNavigate>;

  beforeAll(() => {
    mockKindFormFunction = jest.fn();
    mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

    mockUseNavigate.mockReturnValue(jest.fn());

    render(<LoginForm kindOfFormHandler={mockKindFormFunction} />);
  });
  it("should be called kinfOfFormFunc when clicked button", () => {
    const registerButton = screen.getByText("Register now!");
    expect(registerButton).toBeInTheDocument();
    userEvent.click(registerButton);
    console.log("kindOfFormHandler called");
    expect(mockKindFormFunction).toHaveBeenCalledTimes(1);
  });
});
