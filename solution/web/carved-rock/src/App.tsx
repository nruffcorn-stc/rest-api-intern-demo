import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const Customers = lazy(() => import('./pages/customers/customers'));
const Orders = lazy(() => import('./pages/orders/orders'));
const OrderDetail = lazy(() => import('./pages/orders/orderDetail'));
const Items = lazy(() => import('./pages/items/items'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      
      <Container maxWidth="xl">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Carved Rock Fitness
            </Typography>
          </Toolbar>
        </AppBar>
        <nav>
          <Button component={Link} to="/customers" color="primary">Customers</Button>
          <Button component={Link} to="/orders" color="primary">Orders</Button>
          <Button component={Link} to="/items" color="primary">Items</Button>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/customers" />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/items" element={<Items />} />
          </Routes>
        </Suspense>
        <footer style={{ marginTop: 'auto', padding: '1rem', textAlign: 'center', background: '#f1f1f1' }}>
          <Typography variant="body2" color="textSecondary">
            &copy; 2024 Carved Rock Fitness
          </Typography>
        </footer>
      </Container>
    </BrowserRouter>
  );
}

export default App
