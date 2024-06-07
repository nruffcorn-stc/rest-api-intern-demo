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
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const fetchCustomers = async () => {
    try {
      const customersData = await getCustomers();
      setCustomers(customersData);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = async () => {
    const customer: Customer = { name, email };
    try {
      const newCustomer = await createCustomer(customer);
      setCustomers([...customers, newCustomer]);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      await deleteCustomer(customerId);
      setCustomers(customers.filter(customer => customer.id !== customerId));
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);


  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></div>;
  }

  return (
    <div>
      <h1>Customers</h1>
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
      </TableContainer>
    </div>
  );
};

export default Customers;