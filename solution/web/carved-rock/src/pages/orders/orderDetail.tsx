import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder, OrderDetail } from './orderService';
import { CircularProgress, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from '@mui/material';
import { format } from 'date-fns';

const OrderDetailComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [order, setOrderDetail] = useState<OrderDetail | null>(null);

  const fetchOrder = async () => {
    if (id) {
      try {
        const orderData = await getOrder(id);
        setOrderDetail(orderData);
      } catch (error) {
        console.error(`Failed to fetch order with id ${id}:`, error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <Paper style={{ padding: '2rem' }}>
      <Typography variant="h4">Order Details</Typography>
      <Typography variant="body1"><strong>ID:</strong> {order.id}</Typography>
      <Typography variant="body1"><strong>Status:</strong> {order.status}</Typography>
      <Typography variant="body1"><strong>Created At:</strong> {format(new Date(order.createdAt), 'PPpp')}</Typography>
      <Typography variant="h5" style={{ marginTop: '2rem' }}>Customer Details</Typography>
      <Typography variant="body1"><strong>Name:</strong> {order.customer.name}</Typography>
      <Typography variant="body1"><strong>Email:</strong> {order.customer.email}</Typography>
      
      <Typography variant="h5" style={{ marginTop: '2rem' }}>Order Items</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((orderItem) => (
              <TableRow key={orderItem.itemId}>
                <TableCell>{orderItem.item.name}</TableCell>
                <TableCell>{orderItem.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderDetailComponent;
