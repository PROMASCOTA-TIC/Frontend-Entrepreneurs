"use client"; // Para que este componente también sea un Client Component

import React from 'react';
import { Box, Button, Modal, Checkbox, FormControlLabel, TextField, Rating } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    maxHeight: '80vh',  // Máxima altura para evitar overflow en pantallas pequeñas
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',  // Habilitar scroll vertical si es necesario
};

interface EncuestaPositivaProps {
    open: boolean;
    handleClose: () => void;
}

const EncuestaPositiva: React.FC<EncuestaPositivaProps> = ({ open, handleClose }) => {
    // Estado para los datos de la encuesta
    const [rating, setRating] = React.useState<number | null>(0);
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
    const [additionalComments, setAdditionalComments] = React.useState('');

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
        const surveyData = { rating, selectedOptions, additionalComments };

        // Enviar datos de la encuesta
        const response = await fetch('/api/enviarEncuesta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(surveyData),
        });

        if (response.ok) {
            console.log('Encuesta enviada correctamente');
        } else {
            console.error('Error al enviar encuesta');
        }

        handleClose(); // Cierra la encuesta después de enviar
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                className='flex-column'
                sx={style}>
                <h2 className='h2-semiBold txtcolor-secondary txt-center'>¡Gracias! ¿Tiene alguna otra sugerencia para nosotros?</h2>
                <p className='n-semiBold txt-left' style={{ marginTop: '15px' }}>¿Cuál es tu grado de satisfacción con la calidad del lenguaje?</p>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                // sx={{ mt: 2 }}
                />
                <p className='n-semiBold txt-left' style={{ marginTop: '15px' }}>¿Qué ha afectado a su experiencia?</p>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
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
                <p className='n-semiBold txt-left' style={{ marginTop: '15px' }}>¿Tiene algún comentario adicional? (Opcional)</p>
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
                className='flex-center'
                sx={{ marginTop: '16px', gap:'34px' }}>
                    <Button variant="contained" onClick={handleSubmit} className='bg-secondary' style={{ textTransform: 'none' }}>
                        Enviar
                    </Button>
                    <Button variant="outlined" onClick={handleClose} style={{ borderColor: '#00AA28',color: '#00AA28', textTransform: 'none'}}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EncuestaPositiva;
