import axios from 'axios';

const API_URL = 'http://localhost:4000/api/items';

export type Item = {
  id?: number;
  name: string;
  imageUrl?: string;
};

export type NewItem = {
  name: string;
  description: string;
};

export const getItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get<Item[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const createItem = async (item: NewItem): Promise<Item> => {
  try {
    const response = await axios.post<Item>(API_URL, item);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const deleteItem = async (id: number): Promise<void> => {
  try {
    await axios.delete(API_URL + '/' + id);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
