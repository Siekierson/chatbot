import React from "react";
import styled, { css } from "styled-components";
const Mess = styled.h1`
  width: 45%;
  background-color: #999999;
  padding: 15px;
  margin-top: 10px;
  margin-left: 50%;
  font-size: 2rem;
  color: white;
  text-align: left;
  border-radius: 10px;
  ${({ cobe }: any) =>
    cobe &&
    css`
    background-color: #8d39c5;
      margin-left: 0;
    `}
`;
interface Props {
  cobe: boolean;
  key: string;
  children: React.ReactNode;
}
function Message({ cobe, key, children }: Props) {
  const props = { cobe, key };
  return <Mess {...props}>{children}</Mess>;
}

export default Message;
