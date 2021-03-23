import React, { useState } from "react";
import styled from "styled-components";
const StyledInput = styled.input``;
interface Props {
  handleMess: (mess: string) => void;
}
const Input = ({ handleMess }: Props) => {
  const [mess, setMess] = useState("");
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleMess(mess);
      setMess("");
      e.target.value = "";
    }
  };
  return (
    <StyledInput
      type="text"
      onChange={({ target }) => setMess(target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
export default Input;
