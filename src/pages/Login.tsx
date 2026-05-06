/*import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
     const response = await axios.post(`${(import.meta as any).env.VITE_API_URL}/users/login`, data);
      console.log('Login exitoso:', response.data);
      alert('Sesión iniciada');
    } catch (error) {
      console.error('Error al loguear:', error);
      alert('Error en las credenciales');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('correo')} type="email" placeholder="Correo electrónico" required />
        <br /><br />
        <input {...register('password')} type="password" placeholder="Contraseña" required />
        <br /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;


NOTA: este codigo de arriba se conserva ya que ha habido que sustituirlo por el codigo que viene debajo. Se sustituye para hacer upgrade al codigo para cookies, pero este codigo (basico) de aqui encima FUNCIONA. Se conserva como codigo de rescate por prevencion de una posible urgencia*/

import { useForm } from 'react-hook-form';
import { loginUser } from '../service/authService';

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // Aquí 'data' ahora llevará 'correo' en lugar de 'email'
      const responseData = await loginUser(data); 
      
      console.log('Login exitoso:', responseData);
      alert('Sesión iniciada');
    } catch (error) {
      console.error('Error al loguear:', error);
      alert('Error en las credenciales');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* CAMBIO CLAVE: Volvemos a poner 'correo' que es lo que le gusta a tu backend */}
        <input {...register('correo')} type="email" placeholder="Correo electrónico" required />
        <br /><br />
        <input {...register('password')} type="password" placeholder="Contraseña" required />
        <br /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;