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
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Correo electrónico</label>
            <input {...register('correo')} type="email" placeholder="email@ejemplo.com" required />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input {...register('password')} type="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-login">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;