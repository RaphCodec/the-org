import * as React from 'react';
import { Alert } from '@mui/joy';

const AlertComponent = ({ message, severity, onClose }) => {
  React.useEffect(() => {
    if (severity === 'error') {
      // Disable interactions
      document.body.style.pointerEvents = 'none';
    }
    const timer = setTimeout(() => {
      onClose();
    }, 1500);
    return () => {
      clearTimeout(timer);
      if (severity === 'error') {
        // Enable interactions
        document.body.style.pointerEvents = 'auto';
      }
    };
  }, [onClose, severity]);

  const getColor = () => {
    switch (severity) {
      case 'error':
        return 'red';
      case 'warning':
        return 'yellow';
      case 'success':
        return 'green';
      default:
        return 'black';
    }
  };

  const getPosition = () => {
    switch (severity) {
      case 'error':
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        };
      case 'warning':
      case 'success':
        return {
          bottom: '10px',
          right: '10px',
        };
      default:
        return {};
    }
  };

  return (
    <Alert
      severity={severity}
      sx={{
        position: 'fixed',
        zIndex: 1300,
        color: getColor(),
        ...getPosition(),
      }}
      onClose={onClose}
    >
      {message}
    </Alert>
  );
};

export const ErrorAlert = ({ message, onClose }) => (
  <AlertComponent message={message} severity="error" onClose={onClose} />
);

export const SuccessAlert = ({ message, onClose }) => (
  <AlertComponent message={message} severity="success" onClose={onClose} />
);

export const WarningAlert = ({ message, onClose }) => (
  <AlertComponent message={message} severity="warning" onClose={onClose} />
);
