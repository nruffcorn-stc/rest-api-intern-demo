import axios from 'axios';

const API_URL = 'http://localhost:4000/api/customers';

export interface Customer {
  id?: string;
  name: string;
  email: string;
}

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await axios.get<Customer[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomer = async (id: string): Promise<Customer> => {
  try {
    const response = await axios.get<Customer>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer with id ${id}:`, error);
    throw error;
  }
};

export const createCustomer = async (customer: Customer): Promise<Customer> => {
  try {
    const response = await axios.post<Customer>(API_URL, customer);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (id: string): Promise<void> => {
  try {
    await axios.delete(API_URL + '/' + id);
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};
