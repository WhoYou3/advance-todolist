import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "@firebase/firestore";
import { usersRef } from "../../App";
import { useAuth } from "../../context/AuthContext";

import * as P from "./parts";
import { AddNewBorderForm, AddNewTaskForm, Todo } from "..";

const Todos = () => {
  const context = useAuth();
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
      {context?.currentUserData?.boards?.length! === 0 ? (
        <P.Button onClick={context?.openBoard}>Add new border </P.Button>
      ) : null}
      {context?.isOpenTaskForm ? <AddNewTaskForm /> : null}
      {context?.openBoardForm ? <AddNewBorderForm /> : null}
      <Todo />
    </P.Wrapper>
  );
};

export default Todos;
