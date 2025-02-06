"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

import "/src/assets/styles/gestionContenido/general.css";
import "/src/assets/styles/gestionContenido/estilos.css";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  responseId?: string; // Se usa para asociar la respuesta con el feedback
  feedback?: number | null; // 1 = positivo, 0 = negativo, null = sin feedback
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (msg: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msg }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Respuesta del backend:", responseData);

      if (!responseData || !responseData.response || !responseData.response.chatbotResponse) {
        throw new Error("Respuesta inválida del chatbot.");
      }

      let botReply = responseData.response.chatbotResponse;

      botReply = botReply.replace(/\*\*(.*?)\*\*/g, "$1");

      const responseId = responseData.response.feedbackId;

      setMessages((prev) => [...prev, { sender: "bot", text: botReply, responseId, feedback: null }]);
    } catch (error: any) {
      console.error("Error en handleSend:", error.message);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error al procesar la solicitud, intenta de nuevo." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (responseId: string, rating: number) => {
    try {
      const response = await fetch("http://localhost:3001/api/chatbot/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedbackId: responseId, rating }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar la retroalimentación.");
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.responseId === responseId ? { ...msg, feedback: rating } : msg
        )
      );
    } catch (error) {
      console.error("Error al enviar la retroalimentación:", error);
    }
  };

  return (
    <div className="chatbotContainer">
      <button className="floatingButton p-8" onClick={() => setIsOpen(!isOpen)}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Chatea Ahora
          <div className="icon">💬</div>
        </div>
      </button>

      {isOpen && (
        <div className="chatWindow">
          <div className="bg-secondary chatHeader">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon icon="hugeicons:chat-bot" style={{ fontSize: "25px", color: "white" }} />
              <p className="txtcolor-white n-semiBold">Chatbot</p>
            </div>
            <button className="closeButton" style={{ marginRight: "8px" }} onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          <div className="messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`bubble ${m.sender}`}>
                {m.text}

                {m.sender === "bot" && m.responseId && m.feedback === null && (
                  <div className="feedbackButtons">
                    <button className="thumbsUp" onClick={() => handleFeedback(m.responseId!, 1)}>
                      👍
                    </button>
                    <button className="thumbsDown" onClick={() => handleFeedback(m.responseId!, 0)}>
                      👎
                    </button>
                  </div>
                )}

                {m.sender === "bot" && m.feedback !== null && (
                  <p className="feedbackStatus">
                    {m.feedback === 1 ? "✔ Agradecemos tu feedback positivo" : "❌ Tomaremos en cuenta tu retroalimentación"}
                  </p>
                )}
              </div>
            ))}
            {isLoading && <p className="bot-loading">Escribiendo...</p>}
          </div>


          <input
            className="chatInputContainer"
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                handleSend(e.currentTarget.value.trim());
                e.currentTarget.value = "";
              }
            }}
            placeholder="Escribe un mensaje y presiona Enter"
          />
        </div>
      )}
    </div>
  );
}

export default Chatbot;
