import axios from 'axios';

const API_URL = 'http://localhost:4000/api/items';

export type Item = {
  id?: number;
  name: string;
  imageUrl?: string;
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
