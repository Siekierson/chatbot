import React, { useState } from "react";
import styled from "styled-components";
const StyledInput = styled.input`
  background-color: #fff;
  color: black;
  width: 100%;
  font-size: 3rem;
  padding: 10px;
  height: 80px;
  border: none;
  border-radius: 20px;
`;
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
      placeholder="type..."
      onChange={({ target }) => setMess(target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
export default Input;
