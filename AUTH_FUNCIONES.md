# Auth — para qué sirve cada función

## `authService.ts`

**`loginUser(credentials)`**
Manda correo+contraseña al backend. Si el backend dice OK, guarda el token en una cookie. Devuelve los datos del usuario.

**`refreshToken()`**
Pide al backend un token nuevo. Si el backend lo da, sobreescribe la cookie. Devuelve `true` si fue bien, `false` si algo falló.

**`logout()`**
Borra la cookie y el usuario de localStorage. Manda al usuario a `/login`.

**`registerUser(userData)`**
Manda nombre, apellido, correo y contraseña al backend para crear cuenta nueva.

**Interceptor de REQUEST** (Axios)
Antes de cada petición HTTP, mira si hay token en la cookie y lo añade al header `Authorization`. Así el backend sabe quién eres.

**Interceptor de RESPONSE** (Axios)
Si el backend responde con 401 (token malo o expirado), borra todo y manda al usuario a `/login` automáticamente.

---

## `UserContext.tsx`

Contexto de React que guarda el usuario en memoria mientras la app está abierta. Todos los componentes pueden leerlo con `useUser()`.

**`readFromStorage()`**
Lee el usuario de localStorage al arrancar la app. Si no hay nada, devuelve null.

**`UserProvider`**
Envuelve toda la app. Hace tres cosas:
1. Carga el usuario de localStorage al montar.
2. Cada 90 segundos llama a `refreshToken()`. Si el usuario lleva más de 2 horas sin hacer nada → logout. Si sigue activo → renueva el token.
3. Escucha clicks, teclado y scroll para saber si el usuario está activo.

**`handleLogout()`**
Borra localStorage, pone user a null en memoria, y llama a `logout()` de authService.

**`updateProfile(data)`**
Actualiza los datos del usuario tanto en memoria como en localStorage.

**`logout()` (del contexto)**
Comprueba si hay cookie antes de cerrar sesión. Da igual, acaba llamando a `handleLogout()` de todas formas.

**`useUser()`**
Hook para usar en cualquier componente. Da acceso a `user`, `updateProfile` y `logout`.

---

## `Login.tsx`

Formulario de login. Al hacer submit llama a `loginUser()`, guarda el usuario en localStorage y redirige a `/`.

---

## Flujo resumido

```
Usuario escribe correo+pass
  → loginUser() → backend OK → cookie guardada
  → localStorage guardado → redirect a /
  → UserProvider detecta usuario → refresca token cada 90s
  → Si 401 o inactividad → logout automático
```
