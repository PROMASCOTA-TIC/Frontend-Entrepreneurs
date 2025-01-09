"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

import "/src/assets/styles/gestionContenido/general.css";
import "/src/assets/styles/gestionContenido/estilos.css";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Muestra un indicador de carga mientras se envía el mensaje

  // Función para enviar el mensaje al backend
  const handleSend = async (msg: string) => {
    // 1) Agregar el mensaje del usuario a la lista
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

      const botResponse = await response.text(); // La respuesta es un string
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error al procesar la solicitud, intenta de nuevo." },
      ]);
      console.error(error.message);
    } finally {
      setIsLoading(false); // Finalizar la carga
    }
  };

  return (
    <div className="chatbotContainer">
      {/* Botón flotante para abrir/cerrar */}
      <button className="floatingButton p-8" onClick={() => setIsOpen(!isOpen)}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Chatea Ahora
          <div className="icon">💬</div>
        </div>
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div className="chatWindow">
          <div
            className="bg-secondary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "13px",
              padding: "8px",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <Icon icon="hugeicons:chat-bot" style={{ fontSize: "25px", color: "white" }} />
            <p className="txtcolor-white n-semiBold" style={{ borderRadius: "8px 8px 0 0" }}>
              Chatbot
            </p>
          </div>

          <div className="messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
            {isLoading && <p className="bot-loading">Escribiendo...</p>}
          </div>

          {/* Input fijo abajo */}
          <div className="chatInputContainer">
            <input
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
        </div>
      )}
    </div>
  );
}

export default Chatbot;