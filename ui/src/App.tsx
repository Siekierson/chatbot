import React, { useState, useEffect } from "react";
import Conversation from "./components/Conversation";
import Input from "./components/Inupt";
import styled from "styled-components";
import firstTime from "./functions/firstTime";
import { messages, sendMessage } from "./functions/apiFunctions";

const Wrapper = styled.div`
  padding: 5% 10%;
  text-align: center;
`;
function App() {
  const [conversation, setConversation] = useState<any>([]);
  const handleUserMess = async (message: string) => {
    const id = localStorage.getItem("api-id");
    const response = await sendMessage(id, message);
    console.log(response);
    setConversation((prev: any) => [
      ...prev,
      { isCobe: false, content: message },
      { isCobe: true, content: response.message },
    ]);
  };
  useEffect(() => {
    const token = localStorage.getItem("api-token");
    if (!token) firstTime(setConversation);
    else {
      messages(setConversation);
    }
  }, [setConversation]);
  return (
    <Wrapper>
      {conversation.length !== 0 ? (
        <Conversation data={conversation} />
      ) : (
        "brak"
      )}
      <Input handleMess={handleUserMess} />
    </Wrapper>
  );
}

export default App;
