import React from "react";
import * as P from "./parts";

interface Props {
  message: string;
  color: string;
}

const Message: React.FC<Props> = ({ message }) => {
  return (
    <P.Message>
      <p>{message}</p>
    </P.Message>
  );
};

export default Message;
