import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../App";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { UserTasksData, Board, Task, SubTask } from "../types";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  currentUser: firebase.User | null;
  signUp: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserData: UserTasksData | null;
  fetchData: (object: any) => UserTasksData | null;
  openBoard: () => void;
  openBoardForm: boolean;
  closeBoardForm: () => void;
  isOpenTaskForm: boolean;
  toggleTaskForm: () => void;
  fetchBoardData: (board: Board) => void;
  boardData: Board | null;
  createTask: (task: Task) => void;
  task: Task | null;
  setBoardTask: (task: Task) => void;
  closeTaskForm: () => void;
  isTodoDetail: boolean;
  openTodoDetail: () => void;
  closeTodoDetail: () => void;
  updateTask: (subtask: SubTask[]) => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [currentUserData, setCurrentUserData] = useState<UserTasksData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<boolean>(false);
  const [openBoardForm, setOpenBoardForm] = useState<boolean>(false);
  const [isOpenTaskForm, setIsOpenTaskForm] = useState<boolean>(false);
  const [boardData, setBoardData] = useState<Board | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [isTodoDetail, setIsTodoDetail] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.uid && user.email) {
        setCurrentUser((prev) => (prev = user));
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (sessionStorage.length === 0) {
      logout();
    }
  }, [sessionStorage.length]);

  const openBoard = () => {
    setOpenBoardForm(true);
  };

  const closeBoardForm = () => {
    setOpenBoardForm(false);
  };

  const fetchData = (object: UserTasksData): UserTasksData | null => {
    setCurrentUserData(object);
    return object;
  };

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };
  const toggleTaskForm = () => {
    setIsOpenTaskForm((prev) => !prev);
  };

  const fetchBoardData = (board: Board) => {
    setBoardData((prev) => {
      return { ...prev, ...board };
    });
  };

  const setBoardTask = (task: Task) => {
    setBoardData((prev: any) => {
      return {
        ...prev,
        tasks: {
          ...prev!.tasks,
          notStartYetTasks: [...prev.tasks.notStartYetTasks, task],
        },
      };
    });
  };

  const createTask = (task: Task) => {
    setTask(task);
  };

  const updateTask = (subTask: SubTask[]) => {
    setTask((prev) => {
      return { ...prev!, subTasks: subTask };
    });
  };

  const closeTaskForm = () => {
    setIsOpenTaskForm(false);
  };

  const openTodoDetail = () => {
    setIsTodoDetail(true);
    return;
  };

  const closeTodoDetail = () => {
    setIsTodoDetail(false);
  };

  const value: AuthContextValue = {
    currentUser,
    signUp,
    login,
    logout,
    theme,
    setTheme,
    currentUserData,
    fetchData,
    openBoard,
    openBoardForm,
    closeBoardForm,
    isOpenTaskForm,
    toggleTaskForm,
    fetchBoardData,
    boardData,
    createTask,
    task,
    setBoardTask,
    closeTaskForm,
    openTodoDetail,
    isTodoDetail,
    closeTodoDetail,
    updateTask,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
