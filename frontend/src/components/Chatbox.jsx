import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const userMsg = { sender: "user", text: message };
    setChat([...chat, userMsg]);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          merchantId: 1,
          question: message
        })
      });

      const data = await res.json();

      const botMsg = { sender: "bot", text: data.answer };

      setChat(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }

    setMessage("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "300px" }}>
      <h3>PayMint AI 💬</h3>

      <div style={{ height: "200px", overflowY: "scroll" }}>
        {chat.map((msg, index) => (
          <div key={index}>
            <b>{msg.sender === "user" ? "You" : "AI"}:</b> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}