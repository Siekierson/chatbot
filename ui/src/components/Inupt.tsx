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
const Wrapper = styled.div`
  transform: translateY(-100%);

  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.664);
  width: 100%;
  padding: 10px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.664);
  display: flex;
  padding: 10px;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 10px;
  width: 20%;
  font-size: 1.5rem;
  border: 2px solid white;
  background-color: transparent;
`;
interface Props {
  handleMess: (mess: string) => void;
  answers: string[] | string;
}
const Input = ({ handleMess, answers }: Props) => {
  const [mess, setMess] = useState("");
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleMess(mess);
      setMess("");
      e.target.value = "";
    }
  };
  return (
    <>
      <StyledInput
        type="text"
        placeholder="type..."
        onChange={({ target }) => setMess(target.value)}
        onKeyDown={handleKeyDown}
        disabled={typeof answers === "object"}
      />
      {typeof answers !== "string" && (
        <Wrapper>
          {answers.map((item: string) => (
            <Button onClick={() => handleMess(item)}>{item}</Button>
          ))}
        </Wrapper>
      )}
    </>
  );
};
export default Input;
