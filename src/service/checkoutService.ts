import axios from 'axios';
import { CartItem } from '../context/CartContext';

const API_URL = (import.meta as any).env.VITE_API_URL;

// ── Types ──────────────────────────────────────────────────────────────────

export interface CheckoutItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  talla: string;
}

export interface CheckoutRequest {
  items: CheckoutItem[];
}

export interface CheckoutResponse {
  url: string;
}

export type SessionStatus = 'paid' | 'unpaid' | 'no_payment_required';

export interface SessionStatusResponse {
  status: SessionStatus;
  customerEmail?: string;
  amountTotal?: number;
  currency?: string;
}

// ── API calls ──────────────────────────────────────────────────────────────

export const createCheckoutSession = async (
  items: CartItem[]
): Promise<CheckoutResponse> => {
  const payload: CheckoutRequest = {
    items: items.map(({ productId, nombre, precio, cantidad, talla }) => ({
      id: productId,
      nombre,
      precio,
      cantidad,
      talla,
    })),
  };
  try {
    const response = await axios.post<CheckoutResponse>(
      `${API_URL}/checkout`,
      payload
    );
    return response.data;
  } catch (err: any) {
    // Extraemos el mensaje real del servidor para poder diagnosticar
    const serverMsg =
      err?.response?.data?.message ||
      err?.response?.data ||
      err?.message ||
      'Error desconocido';
    console.error('[Checkout] Error al crear sesión:', {
      status: err?.response?.status,
      data: err?.response?.data,
      message: serverMsg,
    });
    throw new Error(String(serverMsg));
  }
};

export const getSessionStatus = async (
  sessionId: string
): Promise<SessionStatusResponse> => {
  const response = await axios.get<SessionStatusResponse>(
    `${API_URL}/checkout/session-status`,
    { params: { session_id: sessionId } }
  );
  return response.data;
};
