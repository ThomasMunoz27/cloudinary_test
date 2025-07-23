import { object, string } from "yup";

export const formLoginSchema = object({
    usernameOrEmail: string().required("El campo no puede estar vacío"),
    password: string().required("El campo es obligatorio")
})