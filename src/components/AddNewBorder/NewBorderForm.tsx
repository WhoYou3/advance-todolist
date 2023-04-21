import React, { useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineClose } from "react-icons/ai";
import { Shadow, Form, CloseIcon } from "../AddNewTask/parts";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { usersRef } from "../../App";

const NewBorderForm: React.FC = () => {
  const context = useAuth();
  const theme = context?.theme;
  const boardTitle = useRef<HTMLInputElement>(null);

  const addNewBoard = async (e: any) => {
    e.preventDefault();
    const userDocRef = doc(usersRef, context?.currentUser?.uid);
    await updateDoc(userDocRef, {
      boards: arrayUnion({
        title: boardTitle?.current?.value,
        tasks: {
          notStartYetTasks: [],
          pendingTasks: [],
          doneTasks: [],
        },
      }),
    });
    context?.closeBoardForm();
  };
  return (
    <Shadow>
      <Form onSubmit={addNewBoard} themeValue={theme!}>
        <CloseIcon onClick={context?.closeBoardForm}>
          <AiOutlineClose />
        </CloseIcon>
        <h3>Add new Border</h3>
        <label id="Title">Title</label>
        <input ref={boardTitle} id="Title" type="text" required></input>

        <button type="submit">Create Border</button>
      </Form>
    </Shadow>
  );
};

export default NewBorderForm;
