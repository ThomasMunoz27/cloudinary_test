import { object, ref, string } from "yup";

export const formRegisterSchema = object({
    username: string()
    .required("El campo no puede estar vacío"),
    email: string()
    .required("El campo no puede estar vacio")
    .email('Comprueba que tu dirección de correo electrónico es correcta.'),
    password: string()
    .required("El campo es obligatorio"),
    repeatPassword: string()
    .oneOf([ref("password")], "Las contraseñas no coinciden")
    .required("El campo es obligatorio")
})