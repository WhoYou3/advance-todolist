import React, { useEffect } from "react";
import { arrayUnion, doc, getDoc, updateDoc } from "@firebase/firestore";
import { usersRef } from "../../App";
import { useAuth } from "../../context/AuthContext";
import * as P from "./parts";

const Todos = () => {
  const context = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(usersRef, context?.currentUser?.uid);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();
        context?.fetchData(userData);
        console.log(userData);
      } catch {}
    };

    fetchData();
  }, []);

  const addNewBoard = async () => {
    const userDocRef = doc(usersRef, context?.currentUser?.uid);
    await updateDoc(userDocRef, {
      boards: arrayUnion({ title: "tytuł", body: "dupa" }),
    });
    console.log("dodano");
  };

  return (
    <P.Wrapper>
      testujee
      <button onClick={addNewBoard}>Add new border </button>
    </P.Wrapper>
  );
};

export default Todos;
