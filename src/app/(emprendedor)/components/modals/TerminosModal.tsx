"use client";
import React from "react";
import { Dialog, DialogTitle, DialogContent, Button, Typography } from "@mui/material";

interface TerminosModalProps {
  open: boolean;
  onClose: () => void;
}

const TerminosModal: React.FC<TerminosModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#004040", color: "white" }}>
        Términos y condiciones de uso para emprendedores
      </DialogTitle>
      <DialogContent dividers sx={{ maxHeight: "70vh", overflowY: "auto" }}>
        
        <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
          Última actualización: noviembre 2024
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          1. Aceptación de los Términos y Condiciones
        </Typography>
        <Typography variant="body1">
          Al registrarse en la aplicación ProMaskota, el emprendedor acepta cumplir con los presentes 
          Términos y Condiciones. Estos términos constituyen un acuerdo legal entre el emprendedor y 
          ProMaskota. Si no está de acuerdo con alguna de las disposiciones aquí establecidas, no debe 
          registrarse ni utilizar la aplicación.
        </Typography>

        {/* Sección 2 */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          2. Obligaciones del Emprendedor
        </Typography>
        <Typography variant="body1">
          <strong>Despacho y Entrega de Productos:</strong> El emprendedor se compromete a despachar 
          los productos adquiridos por los compradores a través de la aplicación ProMaskota dentro de 
          las 24 y 48 horas siguientes a la confirmación de la recepción del pago. El emprendedor garantizará 
          que los productos lleguen al usuario en perfectas condiciones y dentro del plazo estipulado.
        </Typography>
        <Typography variant="body1">
          <strong>Calidad y Disponibilidad de los Productos:</strong> El emprendedor garantiza que los 
          productos ofrecidos a través de la aplicación ProMaskota son de alta calidad, cumplen con las 
          normativas vigentes, y están disponibles para su despacho inmediato en la cantidad y precio publicados.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          3. Pago
        </Typography>
        <Typography variant="body1">
          <strong>Liquidación de Pagos:</strong> ProMaskota se compromete a realizar el pago acumulado de los productos o 
          servicios vendidos a través de la aplicación semanalmente. El ciclo de pagos que se establece va desde lunes hasta domingo. La liquidación de los pagos correspondientes a las ventas de cada semana se realizará hasta el día martes de la semana siguiente.
        </Typography>
        <Typography variant="body1">
          <strong>Comisiones:</strong> ProMaskota cobrará una comisión acordada con el emprendedor de un porcentaje añadido 
          al precio final de proveedor de cada producto o servicio vendido a través de la aplicación.
           Esta comisión se descontará automáticamente antes de la liquidación del pago semanal al emprendedor.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          4. Administración de la Plataforma
        </Typography>
        <Typography variant="body1">
        ProMaskota se reserva el derecho de desactivar cualquier producto, servicio o cuenta de 
        emprendedor que incumpla con las obligaciones estipuladas en estos Términos y Condiciones. 
        Esto incluye, pero no se limita a, productos o servicios de baja calidad, incumplimiento 
        en los tiempos de entrega, o falta de inclusión del IVA en los precios registrados.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          5. Modificaciones a los Términos y Condiciones
        </Typography>
        <Typography variant="body1">
        ProMaskota se reserva el derecho de modificar estos Términos y Condiciones en cualquier 
        momento. Las modificaciones serán notificadas a los emprendedores a través de la aplicación
         y por correo electrónico. El uso continuado de la aplicación después de la publicación 
         de cualquier modificación constituye la aceptación implícita de los nuevos términos.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          6. Propiedad Intelectual
        </Typography>
        <Typography variant="body1">
        Todo el contenido disponible en la aplicación ProMaskota, incluidos, entre otros, idea
         comercial, textos, gráficos, logotipos, software y ecosistema e-Commerce es propiedad
          de ProMaskota y está protegido por las leyes de propiedad intelectual.
        </Typography>

        {/* Sección 7 */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          7. Limitación de Responsabilidad
        </Typography>
        <Typography variant="body1">
        ProMaskota no será responsable de daños directos, indirectos, incidentales o consecuentes 
        que resulten del uso o la imposibilidad de uso de la aplicación, incluidas, entre otras,
         las pérdidas de beneficios, interrupciones de negocio, o pérdida de información.
        </Typography>

        {/* Sección 8 */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          8. Ley Aplicable y Jurisdicción
        </Typography>
        <Typography variant="body1">
        Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del 
        Ecuador donde ProMaskota tiene su sede. Cualquier disputa que surja en relación con 
        estos términos será resuelta en los tribunales competentes de dicha jurisdicción.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          9. Aceptación de los Términos
        </Typography>
        <Typography variant="body1">
          Al hacer clic en "Aceptar", el emprendedor reconoce que ha leído, comprendido y aceptado 
          cumplir con estos Términos y Condiciones en su totalidad.
        </Typography>

        {/* Contacto */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          Contacto
        </Typography>
        <Typography variant="body1">
          Para cualquier duda o consulta sobre estos términos y condiciones, puede contactarnos a través de 
          <strong> info@promaskota.com</strong>.
        </Typography>

      </DialogContent>

      <Button
        onClick={onClose}
        sx={{
          width: "10%",
          backgroundColor: "#004040",
          color: "white",
          textTransform: "none",
          fontWeight: "bold",
          mt: 2,
          ":hover": { backgroundColor: "#003030" },
          alignContent: "center",
            margin: "auto",
        }}
      >
        Cerrar
      </Button>
    </Dialog>
  );
};

export default TerminosModal;
