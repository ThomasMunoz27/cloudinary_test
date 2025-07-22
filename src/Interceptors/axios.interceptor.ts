import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/constants";
import Swal from "sweetalert2";
import { swalError } from "../utils/swalError";


export const interceptorApiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers:{
        "Content-Type": "application/json",
    },
    timeout: 10000, //demora de  una peticion antes de ser cancelada
})


//funcion para obtener el Token en caso de estar guardado
const getToken = () => {
    const token = localStorage.getItem("auth_token")
    return token ?? null
}
//Aqui iria donde se instancia el token en el bearer
interceptorApiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getToken();

        if(token){
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        if(config.data instanceof FormData && config.headers){
            delete config.headers["Content-Type"]
        }
        return config
    },
    (error) => Promise.reject(error)

)


interceptorApiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        //toma el status del error
        const status = error.response?.status;
        //toma el mensaje del servidor
        const serverMessage = (error.response?.data as any)?.message;

        if(status === 401 || status === 403){
            localStorage.clear(); // Limpia si falla  del local
            swalError("Sesion expirada", "Porfavor vuelve a iniciar sesion")
            
        }
        if (status === 413) {
            Swal.fire({
                icon: "error",
                title: "Archivo demasiado grande",
                text: serverMessage || "La imagen excede el tamaño permitido.",
            });
        }
        //Respuesta de error 500
        if(status === 500 && (!serverMessage || serverMessage.trim() === "")){
            Swal.fire({
                icon: "error",
                title: "Error inesperado",
                text: `${serverMessage}`,
                confirmButtonColor: "#d33",
       });
       
    }

    }
)

export default interceptorApiClient;
