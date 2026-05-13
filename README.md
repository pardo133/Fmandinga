# La Mandinga — Frontend

Tienda online de ropa deportiva. Desarrollado con React + Vite + TypeScript y desplegado en Vercel.

## Tecnologías

- **React 19** + **TypeScript** + **Vite 8**
- **React Router v7** — navegación entre páginas
- **Axios** — peticiones a la API
- **React Hook Form** — gestión de formularios
- **SweetAlert2** — alertas y confirmaciones
- **js-cookie** — manejo de cookies de autenticación

## Requisitos previos

- Node.js 18+
- Backend corriendo (ver repositorio del backend)

## Instalación

```bash
npm install
npm run dev
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:5000/api
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Linter ESLint |

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home — Hero y sección "Sobre nosotros" |
| `/productos` | Catálogo con filtro por categoría y carrito |
| `/checkout` | Proceso de pago |
| `/login` | Inicio de sesión |
| `/register` | Registro de usuario |
| `/perfil` | Perfil y datos del usuario |
| `/admin` | Panel de administración |
| `/success` | Confirmación de compra |
| `/aviso-legal` | Aviso legal |

## Estructura del proyecto

```
src/
├── components/        # Componentes reutilizables
│   ├── Navbar/        # Barra de navegación
│   ├── Cart/          # Carrito (FAB + Drawer)
│   ├── footer/        # Pie de página
│   ├── Hero           # Banner principal
│   └── SobreNosotros  # Sección informativa
├── pages/             # Páginas de la aplicación
├── context/           # CartContext (estado global del carrito)
├── service/           # Servicios (auth, productos)
└── lib/               # Utilidades (SweetAlert config)
```

## Autenticación y sesión

### Almacenamiento del token
El JWT se guarda en dos sitios: cookie `token` (primera opción) y `localStorage` como fallback. `SESSION_MINUTES = 120` **debe coincidir con el `expiresIn` configurado en el backend**.

### Interceptores Axios
- **Request**: añade `Authorization: Bearer <token>` a todas las peticiones salientes.
- **Response**: ante un `401`, borra el token, elimina el usuario de `localStorage` y redirige a `/login`.

### Gestión de inactividad y refresco
- El token se renueva automáticamente cada **90 segundos** mientras el usuario esté activo.
- La actividad se detecta escuchando los eventos: `click`, `keydown`, `mousemove`, `scroll`, `touchstart`.
- Si el usuario lleva **120 minutos** sin interactuar, la sesión se cierra automáticamente.
- Si el backend rechaza la renovación (token expirado en servidor), la sesión también se cierra.

### Historial de implementación
La implementación original del login usaba axios directo sin cookies (`react-hook-form` + llamada a la API + `alert`). Fue reemplazada para añadir autenticación basada en cookies HTTP con refresh automático, conservando `localStorage` como fallback de compatibilidad.

## Modelo de datos

### CartItem — clave compuesta
El campo `id` del carrito sigue el formato `` `${productId}|${talla}` `` para distinguir el mismo producto en distintas tallas dentro del mismo carrito.

### Product — campos por rol
| Campo | Presente en | Tipo | Descripción |
|-------|-------------|------|-------------|
| `tallas` | Solo admins | `Record<'XS'\|'S'\|'M'\|'L', number>` | Stock por talla |
| `tallasDisponibles` | Solo usuarios normales | `Talla[]` | Tallas con stock disponible |

### Checkout — tipos
| Tipo | Descripción |
|------|-------------|
| `CheckoutRequest` | Payload enviado al backend con los items del carrito |
| `CheckoutResponse` | URL de la sesión de Stripe devuelta por el backend |
| `SessionStatus` | Estado del pago: `paid`, `unpaid`, `no_payment_required` |
| `SessionStatusResponse` | Respuesta completa del estado de sesión (email, importe, divisa) |

## Despliegue

El proyecto está desplegado en **Vercel**.

- **URL de producción**: https://lamandinga.tripleeme.es
- Cualquier push a `main` genera un redeploy automático.
