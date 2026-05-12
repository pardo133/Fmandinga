import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL;

export interface Product {
  _id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
}

export interface ProductInput {
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};

export const createProduct = async (data: ProductInput): Promise<Product> => {
  const res = await axios.post(`${API_URL}/products/create`, data);
  return res.data.producto;
};

export const updateProduct = async (id: string, data: Partial<ProductInput>): Promise<Product> => {
  const res = await axios.put(`${API_URL}/products/${id}`, data);
  return res.data.producto;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}`);
};
