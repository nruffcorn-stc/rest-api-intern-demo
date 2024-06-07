import React, { useState } from 'react';
import { createItem, Item, NewItem} from './itemService';
import { 
  TableRow,
  TableCell,
  TextField,
  Button
} from '@mui/material';

interface CreateItemProps {
    onItemCreated: (item: Item) => void;
  }

const CreateItem: React.FC<CreateItemProps> = ({ onItemCreated }) => {

    const handleCreateItem = async () => {
        try {
          //Create New Item here, make sure to let the parent component know
        } catch (error) {
          console.error('Failed to create item:', error);
        }
      };

    return <></>;
    // return (
    //   <TableRow key={-1}>
    //     <TableCell>
    //       <TextField
    //         label="Item Name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         margin="normal"
    //         fullWidth
    //     />
    //     </TableCell>
    //     <TableCell>
    //       <TextField
    //         label="Description"
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //         margin="normal"
    //         fullWidth
    //         />
    //     </TableCell>
    //     <TableCell>
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         onClick={handleCreateItem}
    //         sx={{ marginTop: 2 }}
    //         >
    //         Create Item
    //         </Button>
    //     </TableCell>
    //   </TableRow>
    // );
};

export default CreateItem;