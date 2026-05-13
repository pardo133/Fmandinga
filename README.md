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

## Despliegue

El proyecto está desplegado en **Vercel**.

- **URL de producción**: https://lamandinga.tripleeme.es
- Cualquier push a `main` genera un redeploy automático.
