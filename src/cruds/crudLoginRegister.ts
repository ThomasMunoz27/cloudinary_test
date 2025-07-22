import { ILoginRequest } from "../types/ILoginRequest"
import interceptorApiClient from "../Interceptors/axios.interceptor"
import { IRegisterRequest } from "../types/IRegisterRequest"
import { swalSucces } from "../utils/swalSucces"
import { swalError } from "../utils/swalError"


export const login = async (loginRequest: ILoginRequest) => {
    const response = await interceptorApiClient.post(`/auth/login`, loginRequest)
    const token = response.data.token
    localStorage.setItem("auth_token", token)
    return response
}


export const register = async (registerRequest: IRegisterRequest) => {
    try{
        const response = await interceptorApiClient.post(`auth/register`, registerRequest)
        swalSucces('Registro exitoso', 'Usuario registrado con exito')
        return response.data
    }catch (error){
        swalError("Error en el registro")
        console.error("Error en el registro: ", error);
        throw error
    }
}