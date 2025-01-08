"use client";

import React from "react";
import { Box, Button, Modal, Checkbox, FormControlLabel, TextField, Rating } from "@mui/material";

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

interface EncuestaPositivaProps {
  open: boolean;
  handleClose: () => void;
  feedbackId: string | null; // Recibido del padre
}

const EncuestaPositiva: React.FC<EncuestaPositivaProps> = ({
  open,
  handleClose,
  feedbackId,
}) => {
  const [rating, setRating] = React.useState<number | null>(0);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [additionalComments, setAdditionalComments] = React.useState("");

  const options = [
    "Solucionó mi problema",
    "Borrar instrucciones",
    "Ha sido fácil de seguir",
    "No usaba jerga",
  ];

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) => {
        if (prev.includes(option)) {
            return prev.filter((o) => o !== option); // Desmarcar
        }
        return [...prev, option]; // Marcar
    });
};

  const handleSubmit = async () => {
    // Necesitamos un feedbackId para hacer PATCH
    if (!feedbackId) {
      console.error("No se puede actualizar la encuesta: falta feedbackId");
      return;
    }

    const surveyData = {
      // En este PATCH no enviamos 'response', ya se guardó como 'positivo'
      rating,
      selectedOptions,
      additionalComments,
    };

    try {
      const response = await fetch(`http://localhost:3001/api/faqs/feedback/${feedbackId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        console.log("Encuesta POSITIVA enviada correctamente");
      } else {
        console.error("Error al enviar encuesta POSITIVA");
      }
    } catch (error) {
      console.error("Error de red o fetch al enviar la encuesta positiva:", error);
    }

    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="flex-column" sx={style}>
        <h2 className="h2-semiBold txtcolor-secondary txt-center">
          ¡Gracias! ¿Tiene alguna otra sugerencia para nosotros?
        </h2>
        <p className="n-semiBold txt-left" style={{ marginTop: "15px" }}>
          ¿Cuál es tu grado de satisfacción con la calidad del lenguaje?
        </p>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <p className="n-semiBold txt-left" style={{ marginTop: "15px" }}>
          ¿Qué ha afectado a su experiencia?
        </p>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
              }
              label={option}
            />
          ))}
        </Box>
        <p className="n-semiBold txt-left" style={{ marginTop: "15px" }}>
          ¿Tiene algún comentario adicional? (Opcional)
        </p>
        <TextField
          multiline
          rows={3}
          variant="outlined"
          fullWidth
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Box
          className="flex-center"
          sx={{ marginTop: "16px", gap: "34px" }}
        >
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="bg-secondary"
            style={{ textTransform: "none" }}
          >
            Enviar
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            style={{ borderColor: "#00AA28", color: "#00AA28", textTransform: "none" }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EncuestaPositiva;