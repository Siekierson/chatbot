import React from "react";
import styled from "styled-components";
import Message from "./Message";
const Wrapper = styled.div`
  width: 100%;
  height: 70vh;
  margin-bottom: 2%;
  overflow-y: auto;
`;
interface MessageProps {
  isCobe: boolean;
  content: string | string[];
}
function Conversation({ data }: any) {
  return (
    <Wrapper>
      {data.map(({ isCobe, content }: MessageProps) =>
        typeof content === "object" ? (
          content.map((item: string) => (
            <Message key={`${Math.random()}`} cobe={true}>
              {item}
            </Message>
          ))
        ) : (
          <Message key={`${Math.random()}`} cobe={isCobe}>
            {content}
          </Message>
        )
      )}
    </Wrapper>
  );
}

export default Conversation;
