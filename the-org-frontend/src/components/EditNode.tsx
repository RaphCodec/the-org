import React from 'react';
import Drawer from '@mui/joy/Drawer';
import { useColorScheme } from '@mui/joy/styles';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface EditNodeProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (event: React.FormEvent) => void;
    nodeData: {
        name: string;
        title: string;
        supervisor: string;
        salary: string;
    };
}

export const EditNode: React.FC<EditNodeProps> = ({ open, onClose, onSubmit, nodeData }) => {
    const { mode } = useColorScheme();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(event);
        onClose();
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose} sx={{ width: '400px' }}>
            <form onSubmit={handleSubmit} style={{ width: '100%', padding: '20px', position: 'relative', height: '100%' }}>
                <IconButton 
                    onClick={onClose} 
                    style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        right: '10px', 
                        color: 'red' 
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <h2>Edit Node</h2>
                <div style={{ marginBottom: '20px' }}>
                    <div>Name</div>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        defaultValue={nodeData.name} 
                        style={{ 
                            width: '100%', 
                            marginBottom: '10px', 
                            backgroundColor: mode === 'dark' ? '#f0f0f0' : '#fff',
                            borderRadius: '8px',
                            height: '40px'
                        }} 
                    />
                    <div>Title</div>
                    <input 
                        type="text" 
                        placeholder="Title" 
                        defaultValue={nodeData.title} 
                        style={{ 
                            width: '100%', 
                            marginBottom: '10px', 
                            backgroundColor: mode === 'dark' ? '#f0f0f0' : '#fff',
                            borderRadius: '8px',
                            height: '40px'
                        }} 
                    />
                    <div>Supervisor</div>
                    <input 
                        type="text" 
                        placeholder="Supervisor" 
                        defaultValue={nodeData.supervisor} 
                        style={{ 
                            width: '100%', 
                            marginBottom: '10px', 
                            backgroundColor: mode === 'dark' ? '#f0f0f0' : '#fff',
                            borderRadius: '8px',
                            height: '40px'
                        }} 
                    />
                    <div>Salary</div>
                    <input 
                        type="text" 
                        placeholder="Salary" 
                        defaultValue={nodeData.salary} 
                        style={{ 
                            width: '100%', 
                            marginBottom: '10px', 
                            backgroundColor: mode === 'dark' ? '#f0f0f0' : '#fff',
                            borderRadius: '8px',
                            height: '40px'
                        }} 
                    />
                </div>
                <div style={{ position: 'absolute', bottom: '20px', width: 'calc(100% - 40px)', display: 'flex', justifyContent: 'space-between' }}>
                    <button 
                        type="submit" 
                        style={{ 
                            backgroundColor: mode === 'dark' ? '#333' : '#fff', 
                            color: 'blue',
                            border: '1px solid blue',
                            width: '48%'
                        }}
                    >
                        Submit
                    </button>
                    <button 
                        type="button" 
                        onClick={onClose} 
                        style={{ 
                            backgroundColor: mode === 'dark' ? '#333' : '#fff', 
                            color: 'red',
                            border: '1px solid red',
                            width: '48%'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Drawer>
    );
};

export default EditNode;