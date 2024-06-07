import React, { useState } from 'react';
import { createItem, Item, NewItem} from './itemService';
import { 
  Box,
  TextField,
  Button
} from '@mui/material';

interface CreateItemProps {
    onItemCreated: (item: Item) => void;
  }

const CreateItem: React.FC<CreateItemProps> = ({ onItemCreated }) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleCreateItem = async () => {
        const newItem: NewItem = { name, description };
        try {
          const createdItem = await createItem(newItem);
          onItemCreated(createdItem);
          setName('');
          setDescription('');
        } catch (error) {
          console.error('Failed to create item:', error);
        }
      };

    return (
        <Box component="form" noValidate autoComplete="off" sx={{ marginBottom: 2 }}>
            <TextField
            label="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            fullWidth
            />
            <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            fullWidth
            />
            <Button
            variant="contained"
            color="primary"
            onClick={handleCreateItem}
            sx={{ marginTop: 2 }}
            >
            Create Item
            </Button>
        </Box>
    );
};

export default CreateItem;