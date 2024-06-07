import React, { useEffect, useState } from 'react';
import { getItems, Item } from './itemService';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress 
} from '@mui/material';

const Customers: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Item[]>([]);
  
  const fetchItems = async () => {
    try {
      const itemData = await getItems();
      setItems(itemData);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></div>;
  }

  return (
    <div>
      <h1>Items</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell><img src={item?.imageUrl} style={{ maxWidth: 100 }}/></TableCell>
                <TableCell>{item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Customers;