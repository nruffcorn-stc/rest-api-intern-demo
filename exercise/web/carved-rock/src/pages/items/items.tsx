import React, { useEffect, useState } from 'react';
import { getItems, deleteItem, Item } from './itemService';
import CreateItem from './createItem';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead,
  TableRow, 
  Paper, 
  CircularProgress,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Items: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  
  const fetchItems = async () => {
    try {
      //Get Items here
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } 
  };

  const handleItemCreated = (newItem: Item) => {
    //Handle Item created here
  };

  const handleDeleteItem = async (id: number) => {
    try {
      //Handle Delete item here
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></div>;
  }

  return (
    <div>
      <h1>Items</h1>
      {/* <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CreateItem onItemCreated={handleItemCreated} />
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell><img src={item?.imageUrl} style={{ maxWidth: 100 }}/></TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteItem(item.id!)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
};

export default Items;