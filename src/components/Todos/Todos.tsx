import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "@firebase/firestore";
import { usersRef } from "../../App";
import { useAuth } from "../../context/AuthContext";

import * as P from "./parts";
import { AddNewBorderForm, AddNewTaskForm } from "..";

const Todos = () => {
  const context = useAuth();
  const [newTaskForm, setNewTaskForm] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(usersRef, context?.currentUser?.uid);
        const unsubscribe = onSnapshot(userDocRef, (userDocSnap) => {
          const userData = userDocSnap.data();
          context?.fetchData(userData);
        });
        return () => unsubscribe;
        // const userDocSnap = await getDoc(userDocRef);
      } catch {}
    };

    fetchData();
  }, []);

  return (
    <P.Wrapper>
      <button onClick={context?.openBoard}>Add new border </button>
      {context?.isOpenTaskForm ? <AddNewTaskForm /> : null}
      {context?.openBoardForm ? <AddNewBorderForm /> : null}
    </P.Wrapper>
  );
};

export default Todos;
