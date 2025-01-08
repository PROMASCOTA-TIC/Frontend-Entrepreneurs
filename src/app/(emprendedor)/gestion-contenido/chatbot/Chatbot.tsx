"use client"; // si usas Next.js 13 con App Router

import React, { useState } from "react";

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';

function Chatbot() {
  // Manejo de estado para mostrar/ocultar el chat
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]); 

  // Lógica para enviar un mensaje
  const handleSend = (msg: string) => {
    // Aquí podrías llamar a tu backend (API) o lógica de IA
    setMessages((prev) => [...prev, `Tú: ${msg}`]);
    // Respuesta simulada
    setMessages((prev) => [...prev, `Bot: Respuesta a "${msg}"`]);
  };

  return (
    <div className="chatbotContainer">
      {/* Botón flotante para abrir/cerrar */}
      <button 
        className="floatingButton" 
        onClick={() => setIsOpen(!isOpen)}
      >
        Chat
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div className="chatWindow">
          <h3>Chatbot</h3>
          <div className="messages">
            {messages.map((m, idx) => (
              <div key={idx}>{m}</div>
            ))}
          </div>
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
      )}
    </div>
  );
}

export default Chatbot;