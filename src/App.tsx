import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [socket, setsocket] = useState<null | WebSocket>(null);
  const [LatestMessage,setLatestMessage] = useState("");
  const [sendmessage,setsendmessage] = useState("");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("connected");
      setsocket(socket);
    };

    socket.onmessage = (message) => {
      console.log("received message", message.data);
      setLatestMessage(message.data);
    };
  }, []);

  if (!socket) {
    return <div>Connecting To Web Socket Server...</div>;
  }

  return (
    <>
      <input onChange={(e) => {
        setsendmessage(e.target.value)
      }}/>
      <button
        onClick={() => {
          socket.send(sendmessage);
        }}
      >
        Send
      </button>
      {LatestMessage}
    </>
  );
}

export default App;
