import * as yup from 'yup';

const checkoutSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(4, "El nombre debe tener al menos 4 caracteres") 
    .max(15, "El nombre no debe exceder los 15 caracteres"),

  lastname: yup
    .string()
    .required("El apellido es obligatorio")
    .min(3, "El apellido debe tener al menos 3 caracteres") 
    .max(15, "El apellido no debe exceder los 15 caracteres"),

  email: yup
    .string()
    .required("El correo electrónico es obligatorio")
    .email("Debe ser un correo electrónico válido")
    .max(50, "El correo no debe exceder los 50 caracteres"), 

  confirmEmail: yup
    .string()
    .required("La confirmación del correo es obligatoria")
    .oneOf([yup.ref('email'), null], 'Los correos electrónicos deben coincidir'),

  phone: yup
    .string()
    .required("El teléfono es obligatorio")
    .min(10, "El teléfono debe tener al menos 10 dígitos") 
    .max(15, "El teléfono no debe exceder los 15 dígitos")
    .matches(/^[0-9]+$/, "Solo se permiten dígitos"), 
});

export default checkoutSchema