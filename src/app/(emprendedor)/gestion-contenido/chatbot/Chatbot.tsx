"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

import "/src/assets/styles/gestionContenido/general.css";
import "/src/assets/styles/gestionContenido/estilos.css";
import { URL_BASE } from "@/config/config";

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

  const predefinedResponses: { [key: string]: string } = {
    "cómo inicio sesión?": "Para iniciar sesión, ve a la página principal y haz clic en 'Iniciar sesión'. Luego, introduce tu correo y contraseña.",
    "cómo me registro?": "Para registrarte, haz clic en 'Registrarse' en la página principal y completa el formulario con tus datos.",
    "olvidé mi contraseña?": "Si olvidaste tu contraseña, haz clic en '¿Olvidaste tu contraseña?' en la pantalla de inicio de sesión y sigue los pasos.",
    "dónde encuentro soporte?": "Puedes ingresar en la página de Preguntas Frecuentes y buscar la respuesta a tu pregunta.Si no encuentras la respuesta, puedes contactar a soporte a través de nuestras redes sociales.",
    "cómo puedo enviar contenido?": "Accede a la sección correspondiente de Enlaces de interés o Publi-reportajes, ingresa al formulario para compartir contenido, completa el formulario y envíalo ",
    "cuánto tiempo tarda en aprobarse mi cuenta de emprendedor?": "El proceso de aprobación de una cuenta de emprendedor toma entre 24 y 48 horas",
    "cuáles son los métodos de pago disponibles?": "Se aceptan tarjetas de crédito y débito, transferencias bancarias y Payphone",
    "cómo puedo hacer una compra?": "Explora los productos, agrega los productos al carrito, revisa tu pedido, selecciona el método de entrega, elige el método de pago y confirma tu compra",
    "qué debo hacer si mi pago fue rechazado": "Verifica los datos ingresados, consulta con tu banco, intenta con otro método de pago, contacta a nuestro soporte",
    "para qué tipos de mascotas están disponibles los productos y servicios": "Perros, gatos, aves, pequeños mamíferos, peces, entre otros",
    "los precios de los productos y servicios incluyen IVA?": "Sí, todos los precios mostrados en la plataforma ya incluyen el IVA.",
    "cómo se protege mi información personal en la plataforma?": "Se tienen medidas de protección como cifrado de datos, acceso restringido, autenticación segura y cumplimiento de normativas de protección de datos",
    "qué pasa si incumplo los términos y condiciones de la plataforma?": "Se puede suspender de forma temporal tu cuenta, desactivar productos o servicios. En casos graves, se puede cerrar tu cuenta.",
  };

  const normalizeText = (text: string) => {
    return text
      .toLowerCase() // Convertir a minúsculas
      .trim() // Eliminar espacios extra al inicio y al final
      .replace(/\s+/g, " "); // Reemplazar múltiples espacios por uno solo
  };

  const handleSend = async (msg: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);

    // Normalizar el mensaje (convertir a minúsculas y quitar espacios extras)
    const normalizedMsg = normalizeText(msg);

    // Verificar si el mensaje tiene una respuesta predefinida
    if (predefinedResponses[normalizedMsg]) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: predefinedResponses[normalizedMsg], },
      ]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${URL_BASE}chatbot/chat`, {
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
      const response = await fetch(`${URL_BASE}chatbot/feedback`, {
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

                {/* Mostrar botones de feedback SOLO si el mensaje NO es predefinido */}
                {m.sender === "bot" && m.responseId && !m.responseId.startsWith("predefined-") && m.feedback === null && (
                  <div className="feedbackButtons">
                    <button className="thumbsUp" onClick={() => handleFeedback(m.responseId!, 1)}>
                      👍
                    </button>
                    <button className="thumbsDown" onClick={() => handleFeedback(m.responseId!, 0)}>
                      👎
                    </button>
                  </div>
                )}

                {/* Mostrar mensaje de feedback SOLO si el mensaje NO es predefinido */}
                {m.sender === "bot" && m.responseId && !m.responseId.startsWith("predefined-") && m.feedback !== null && (
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
