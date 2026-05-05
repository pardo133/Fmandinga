import { useForm } from 'react-hook-form';
import { registerUser } from '../service/authService';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '2rem' }}>
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
       
<input {...register('nombre')} placeholder="Nombre" required />


<input {...register('apellido')} placeholder="Apellido" required />


<input {...register('correo')} type="email" placeholder="Correo electrónico" required />


<input {...register('password')} type="password" placeholder="Contraseña" required />
        <br /><br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;