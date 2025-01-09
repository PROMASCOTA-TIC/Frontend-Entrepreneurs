import type { Metadata } from "next";

import "./globals.css";
import Chatbot from "./(emprendedor)/gestion-contenido/chatbot/Chatbot";

export const metadata: Metadata = {
  title: "Promascota",
  description: "Tienda virtual para la compra y venta de productos y servicios para mascotas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
            {children}
            <Chatbot />
      </body>
    </html>
  );
}
