import React, { useState, useEffect } from "react";
import Conversation from "./components/Conversation";
import Input from "./components/Inupt";
import styled from "styled-components";
import firstTime from "./functions/firstTime";

const Wrapper = styled.div`
  padding: 5% 10%;
`;
function App() {
  const [conversation, setConversation] = useState([]);
  const [userData, setUserData] = useState(false);
  // const handleUserMess = (mess: string) => {
  //   setConversation([]);
  // };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) firstTime();
  }, [setConversation]);
  return (
    <Wrapper>
      <Conversation data={conversation} />
      {/* <Input handleMess={handleUserMess} /> */}
    </Wrapper>
  );
}

export default App;
