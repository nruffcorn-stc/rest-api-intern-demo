import axios from 'axios';
import { Customer } from '../customers/customerService';
import { Item } from '../items/itemService';

const API_URL = 'http://localhost:4000/api/orders';

export interface Order {
  id?: string;
  status: string;
  createdAt: Date;
  customer: Customer;
}

export interface OrderDetail {
    id?: string;
    status: string;
    createdAt: Date;
    customer: Customer;
    items: OrderItem[];
}

export interface OrderItem {
    itemId: number;
    item: Item;
    quantity: number;
}

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get<Order[]>(API_URL+ '?take=100&skip=0');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrder = async (orderId: string): Promise<OrderDetail> => {
    try {
      const response = await axios.get<OrderDetail>(API_URL + '/' + orderId);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };