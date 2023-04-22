import React, { useEffect, useRef, useState } from "react";
import { usersRef } from "../../App";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineClose } from "react-icons/ai";
import { Task } from "../../types";
import * as P from "./parts";
import Message from "../Message/Message";

const AddNewTaskForm: React.FC = () => {
  const context = useAuth();
  const theme = context?.theme;
  const [subtasks, setSubtasks] = useState(["", ""]);
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const subtaskRefs = useRef<Array<HTMLInputElement | null>>([]);

  const addSubtask = () => {
    if (subtasks.length < 8) setSubtasks((prev) => [...prev, ""]);
  };

  useEffect(() => {
    if (task) {
      setToBoard(task!);
    }
  }, [task]);

  const setLocalTask = () => {
    setTask((prevState) => {
      const updatedTask = {
        ...prevState,
        title: title.current?.value,
        description: description.current?.value,
        subTasks: subtaskRefs.current.map(
          (subtaskRef) => subtaskRef?.value || ""
        ),
      } as Task;

      return updatedTask;
    });
  };

  const setToBoard = async (task: Task) => {
    const userDocRef = doc(usersRef, context?.currentUser?.uid);
    console.log(task);
    context!.setBoardTask(task);
    const boardIndex = context?.currentUserData?.boards?.findIndex(
      (board) => context.boardData?.title === board.title
    );
    console.log("TESTUJE ILE RAZY ");
    if (boardIndex !== -1) {
      const boardDocSnapshot = await getDoc(userDocRef);
      const boardData = boardDocSnapshot.data();
      boardData!.boards[boardIndex!].tasks.notStartYetTasks.push(task);

      try {
        await updateDoc(userDocRef, boardData);
      } catch {}
      context?.closeTaskForm();
    }
  };

  const handleSubtaskRemove = (index: number) => {
    setSubtasks((prevSubtasks) => {
      const updatedSubtasks = [...prevSubtasks];
      updatedSubtasks.splice(index, 1);
      return updatedSubtasks;
    });
  };

  return (
    <P.Shadow>
      <P.Form
        onSubmit={(e) => {
          e.preventDefault();

          console.log("dasdas");
          setLocalTask();
        }}
        themeValue={theme!}
      >
        <P.CloseIcon onClick={context?.toggleTaskForm}>
          <AiOutlineClose />
        </P.CloseIcon>
        <h3>Add new task</h3>
        <label id="Title">Title</label>
        <input required ref={title} id="Title" type="text"></input>
        <label id="Description">Description</label>
        <textarea required ref={description} id="Description"></textarea>
        <label id="subtasks">Subtasks</label>
        {subtasks.map((subtask, index) => (
          <P.WrapperSubtasks key={index}>
            <input
              ref={(el) => (subtaskRefs.current[index] = el)}
              id="subtasks"
            ></input>
            <AiOutlineClose onClick={() => handleSubtaskRemove(index)} />
          </P.WrapperSubtasks>
        ))}

        <button
          disabled={subtasks.length === 8 ? true : false}
          onClick={(e) => {
            e.preventDefault();
            addSubtask();
          }}
        >
          Add New Subtask
        </button>
        <label>Status</label>
        <button disabled={isLoading ? true : false} type="submit">
          Create Task
        </button>
      </P.Form>
    </P.Shadow>
  );
};

export default AddNewTaskForm;
