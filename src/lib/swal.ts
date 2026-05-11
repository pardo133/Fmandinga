import Swal from 'sweetalert2';

const base = Swal.mixin({
  customClass: {
    confirmButton: 'swal-btn-confirm',
    cancelButton:  'swal-btn-cancel',
  },
  buttonsStyling: false,
  borderRadius: '14px',
});

export const swalOk = (title: string, text?: string) =>
  base.fire({
    icon: 'success',
    title,
    text,
    timer: 1800,
    timerProgressBar: true,
    showConfirmButton: false,
    iconColor: '#76b82a',
  });

export const swalError = (title: string, text?: string) =>
  base.fire({
    icon: 'error',
    title,
    text,
    confirmButtonText: 'Cerrar',
    iconColor: '#e74c3c',
  });
