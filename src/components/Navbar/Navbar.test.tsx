import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "./Navbar";

jest.mock("../../context/AuthContext");

let toggleTaskFormMock: jest.Func;
toggleTaskFormMock = jest.fn();
let logoutMock: jest.Func;
logoutMock = jest.fn();

(useAuth as jest.Mock).mockImplementation(() => ({
  toggleTaskForm: toggleTaskFormMock,
  logout: logoutMock,
}));
describe("Navbar element", () => {
  it("Open new task form", () => {
    render(<Navbar />);
    const newTaskButton = screen.getByText(/add new task/i);
    fireEvent.click(newTaskButton);
    expect(toggleTaskFormMock).toHaveBeenCalled();
  });

  it("Logout button", () => {
    render(<Navbar />);
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    expect(logoutMock).toHaveBeenCalled();
  });
});
