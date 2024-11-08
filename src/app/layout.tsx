import type { Metadata } from "next";
import "./globals.css";

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
      </body>
    </html>
  );
}
