import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${(import.meta as any).env.VITE_API_URL}/users/login`, data);
      alert('Sesión iniciada');
    } catch (error) {
      alert('Error en las credenciales');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} type="email" placeholder="Email" required />
        <br /><br />
        <input {...register('password')} type="password" placeholder="Contraseña" required />
        <br /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;