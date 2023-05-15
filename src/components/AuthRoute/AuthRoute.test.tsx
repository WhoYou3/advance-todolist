import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthRoute from "./AuthRoute";
import { useNavigate } from "react-router-dom";

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(() => ({
    currentUser: { uid: "exampleUserId" },
  })),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));
describe("Check automatic routing", () => {
  it("Check routing without userId", () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => navigateMock);
    render(
      <AuthRoute>
        <div>test</div>
      </AuthRoute>
    );
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
  it("Check routing without userId", () => {
    sessionStorage.setItem("id", "exampleUserId");
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => navigateMock);
    render(
      <AuthRoute>
        <div>test</div>
      </AuthRoute>
    );
    expect(navigateMock).toHaveBeenCalledWith("/exampleUserId");
  });
});
