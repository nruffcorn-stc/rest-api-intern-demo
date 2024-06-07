import React, { useEffect, useState } from 'react';
import { getOrders, BasicOrder } from './orderService';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress,
  Button
} from '@mui/material';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const OrdersComponent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    try {
       //Get Orders here
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></div>;
  }

  return (
    <div>
      <h1>Orders</h1>
      {/* <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{format(new Date(order.createdAt), 'PPpp')}</TableCell>
                <TableCell>
                  <Button 
                    component={Link} 
                    to={`/orders/${order.id}`} 
                    color="primary"
                    variant="contained"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
};

export default OrdersComponent;
