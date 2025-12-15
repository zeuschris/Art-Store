import * as yup from 'yup';

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  email: yup
    .string()
    .email("Debe ser un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),

  subject: yup
    .string()
    .required("El asunto es obligatorio")
    .min(5, "El asunto es demasiado corto"),
    
  message: yup
    .string()
    .required("El mensaje es obligatorio")
    .min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export default contactSchema;