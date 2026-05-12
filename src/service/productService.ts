import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL;

export type Talla = 'XS' | 'S' | 'M' | 'L';
export type TallasStock = Record<Talla, number>;
export const TALLAS: Talla[] = ['XS', 'S', 'M', 'L'];

export interface Product {
  _id: string;
  nombre: string;
  precio: number;
  descripcion?: string;
  tallas?: TallasStock;           // solo presente para admins
  tallasDisponibles?: Talla[];    // solo presente para usuarios normales
  categoria: 'Leggings' | 'Camisetas' | 'Zapatillas';
  imagen?: string;
}

export const fetchProducts = (): Promise<Product[]> =>
  axios.get(`${API_URL}/products`).then(r => r.data);

export const createProduct = (formData: FormData): Promise<{ producto: Product }> =>
  axios.post(`${API_URL}/products/create`, formData).then(r => r.data);

export const updateProduct = (id: string, formData: FormData): Promise<{ producto: Product }> =>
  axios.put(`${API_URL}/products/${id}`, formData).then(r => r.data);

export const deleteProduct = (id: string): Promise<void> =>
  axios.delete(`${API_URL}/products/${id}`).then(r => r.data);
