import logo from "./logo.svg";
import "./App.css";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
const SEND_MESSAGE = gql`
  mutation setHello($message: String!, $chatId: String!, $clientId: String!) {
    setHello(message: $message, chatId: $chatId, clientId: $clientId)
  }
`;
const SUB_TO_CHAT = gql`
  subscription SubToChat($chatId: String!) {
    subToChat(chatId: $chatId) {
      message
      clientId
      date
    }
  }
`;
function App() {
  const [clientId, setClientId] = useState("");
  useEffect(() => {
    setClientId(uuid());
  }, []);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE);
  const {
    data: sub_data,
    loading: sub_loading,
    error: sub_error,
  } = useSubscription(SUB_TO_CHAT, { variables: { chatId: "123" } });
  useEffect(() => {
    if (!sub_loading && !sub_error && sub_data) {
      //save message to messages state
      setMessages([...messages, sub_data.subToChat]);
    } else {
      console.log(
        "%cApp.js line:26 sub_loading",
        "color: #007acc;",
        sub_loading
      );
    }
  }, [sub_data]);
  return (
    <div className="App">
      <div className="App-header">
        <div>
          {messages.map((item, index) => (
            <div>
              {" "}
              {item.message}, {item.date}{" "}
            </div>
          ))}
          <input
            className="message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <div
            className="send"
            onClick={() => {
              sendMessage({ variables: { clientId, message, chatId: "123" } });
            }}
          >
            Send
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
