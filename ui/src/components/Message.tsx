import React from "react";
import styled from "styled-components";
const Wrapper = styled.div``;
const Mess = styled.h1``;
interface Props {
  cobe: boolean;
  key: string;
  children: React.ReactNode;
}
function Message({ cobe, key, children }: Props) {
  return (
    <Wrapper key={key}>
      <Mess>{children}</Mess>
    </Wrapper>
  );
}

export default Message;
