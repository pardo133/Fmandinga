import { useForm } from 'react-hook-form';
import { loginUser, forgotPassword } from '../service/authService';
import { swalOk, swalError } from '../lib/swal';
import Swal from 'sweetalert2';
import './Login.css';

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {

      const responseData = await loginUser(data);

      console.log('Login exitoso:', responseData);


      localStorage.setItem('user', JSON.stringify(responseData.user || responseData));

      await swalOk('¡Bienvenido!', 'Sesión iniciada correctamente');
      window.location.href = "/";

    } catch (error) {
      console.error('Error al loguear:', error);
      swalError('Error al iniciar sesión', 'Comprueba tu correo y contraseña');
    }
  };

  const handleForgotPassword = async () => {
    const { value: correo } = await Swal.fire({
      title: 'Recuperar contraseña',
      input: 'email',
      inputLabel: 'Introduce tu correo electrónico',
      inputPlaceholder: 'email@ejemplo.com',
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });
    if (!correo) return;
    try {
      await forgotPassword(correo);
      swalOk('Correo enviado', 'Revisa tu bandeja de entrada');
    } catch {
      swalError('Error', 'No se pudo enviar el correo de recuperación');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Correo electrónico</label>
            <input
              {...register('correo')}
              type="email"
              placeholder="email@ejemplo.com"
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-login">Entrar</button>
        </form>
        <button type="button" className="btn-forgot" onClick={handleForgotPassword}>
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </div>
  );
};

export default Login;