import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface NotificationProps {
    open: boolean;
    onClose: () => void;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
}

const Notification: React.FC<NotificationProps> = ({ open, onClose, message, type }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={onClose}
                severity={type}
                sx={{
                    width: '100%',
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
