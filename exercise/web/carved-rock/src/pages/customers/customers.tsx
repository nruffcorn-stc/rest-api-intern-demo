import React, { useEffect, useState } from 'react';
import { getCustomers, createCustomer, deleteCustomer, Customer } from './customerService';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress,
  IconButton,
  Button,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Customers: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCustomers = async () => {
    try {
      //Get Customers Here
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  };

  const handleCreateCustomer = async () => {
    try {
      //Handle Creating Customer
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    try {

    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></div>;
  }

  return (
    <div>
      <h1>Customers</h1>
      {/* 
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  fullWidth
                  />
              </TableCell>
              <TableCell>
              <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  fullWidth
                  />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateCustomer}
                  sx={{ marginTop: 2 }}
                  >
                  Create Item
                </Button>
              </TableCell>
            </TableRow>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteCustomer(customer.id!)}
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

export default Customers;