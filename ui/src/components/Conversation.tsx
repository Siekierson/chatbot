import React from "react";
import styled from "styled-components";
import Message from "./Message";
const Wrapper = styled.div``;
function Conversation({ data }: any) {
  return (
    <Wrapper>
      {data.map(({ cobe, message }: any) => (
        <Message key={`${Math.random()}`} cobe={cobe}>
          {message}
        </Message>
      ))}
    </Wrapper>
  );
}

export default Conversation;
