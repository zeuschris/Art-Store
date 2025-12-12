import * as yup from 'yup';

const checkoutSchema = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    lastname: yup.string().required('El apellido es obligatorio'),
    email: yup.string().email('Debe ser un correo electrónico válido').required('El correo es obligatorio'),
    confirmEmail: yup
        .string()
        .required('La confirmación del correo es obligatoria')
        .oneOf([yup.ref('email')], 'Los correos electrónicos deben coincidir'),
    phone: yup
        .string()
        .required('El teléfono es obligatorio')
        .matches(/^[0-9]+$/, 'Solo se permiten dígitos')
        .min(8, 'El teléfono debe tener al menos 8 dígitos'),
}).required();

export default checkoutSchema