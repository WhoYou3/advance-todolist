import React, { useEffect } from "react";
import { getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { fetchUserData } from "../App";

const Home = () => {
  const context = useAuth();

  useEffect(() => {
    const test = async () => {
      const data = fetchUserData(context!.currentUser!.uid);
      const userData = await getDoc(data);
      console.log(userData.id);
    };
    test();
  }, []);
  return <div>Home</div>;
};

export default Home;
