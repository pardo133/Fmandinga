import { useForm } from 'react-hook-form';
import { registerUser } from '../service/authService';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data);
      alert('¡Usuario registrado con éxito!');
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un error al registrar el usuario.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Crear Cuenta</h2>
        <p className="auth-subtitle">Únete a la comunidad de La Mandinga</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-row">
            <div className="input-group">
              <label>Nombre</label>
              <input {...register('nombre')} placeholder="Tu nombre" required />
            </div>
            <div className="input-group">
              <label>Apellido</label>
              <input {...register('apellido')} placeholder="Tu apellido" required />
            </div>
          </div>

          <div className="input-group">
            <label>Correo electrónico</label>
            <input {...register('correo')} type="email" placeholder="email@ejemplo.com" required />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input {...register('password')} type="password" placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn-auth">Registrarse</button>
        </form>
        
        <p className="auth-footer">
          ¿Ya tienes cuenta? <span onClick={() => navigate('/login')}>Inicia sesión</span>
        </p>
      </div>
    </div>
  );
};

export default Register;