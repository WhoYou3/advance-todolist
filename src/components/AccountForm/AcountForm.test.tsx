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

  beforeEach(() => {
    mockKindFormFunction = jest.fn();
    mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

    mockUseNavigate.mockReturnValue(jest.fn());

    render(<LoginForm kindOfFormHandler={mockKindFormFunction} />);
  });
  it("should be called kinfOfFormFunc when clicked button", async () => {
    const switchForm = screen.getByText(/register now!/i);
    screen.logTestingPlaygroundURL();
    expect(switchForm).toBeInTheDocument();
    await userEvent.click(switchForm);
    expect(mockKindFormFunction).toHaveBeenCalledTimes(1);
    await userEvent.click(switchForm);
    expect(mockKindFormFunction).toHaveBeenCalledTimes(2);
  });
  it("validation register submit", async () => {
    const submitButton = screen.getByRole("button");
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");

    userEvent.type(email, "przyklad123@gmail.com");
    userEvent.type(password, "przyklad123");

    await userEvent.click(submitButton);
    expect(mockUseNavigate).toHaveBeenCalled();
  });
});

describe("Register Form", () => {
  let mockKindFormFunction: jest.MockedFunction<() => void>;
  let mockUseNavigate: jest.MockedFunction<typeof useNavigate>;
  beforeEach(() => {
    mockKindFormFunction = jest.fn();
    mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

    mockUseNavigate.mockReturnValue(jest.fn());

    render(<RegisterForm kindOfFormHandler={mockKindFormFunction} />);
  });
  it("should be called kinfOfFormFunc when clicked button", async () => {
    screen.logTestingPlaygroundURL();
    const switchForm = screen.getByText(/login/i);
    expect(switchForm).toBeInTheDocument();
    await userEvent.click(switchForm);
    expect(mockKindFormFunction).toHaveBeenCalledTimes(1);
    await userEvent.click(switchForm);
    expect(mockKindFormFunction).toHaveBeenCalledTimes(2);
  });
  it("validation login submit", async () => {
    const submitButton = screen.getByRole("button");
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    const repeatPassword = screen.getByTestId("repeat-password");

    userEvent.type(email, "przyklad123@gmail.com");
    userEvent.type(password, "przyklad123");
    userEvent.type(repeatPassword, "przyklad123");

    await userEvent.click(submitButton);
    expect(mockUseNavigate).toHaveBeenCalled();
  });
});
