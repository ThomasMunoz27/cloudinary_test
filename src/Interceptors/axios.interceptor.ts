import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL } from "../utils/constants";
import Swal from "sweetalert2";


export const interceptorApiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers:{
        "Content-Type": "application/json",
    },
    timeout: 10000, //demora de  una peticion antes de ser cancelada
})

//Aqui iria donde se instancia el token en el bearer
//logica


interceptorApiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        //toma el status del error
        const status = error.response?.status;
        //toma el mensaje del servidor
        const serverMessage = (error.response?.data as any)?.message;


        //Respuesta de error 500
        if(status === 500 && (!serverMessage || serverMessage.trim() === "")){
            Swal.fire({
                icon: "error",
                title: "Error inesperado",
                text: serverMessage,
                confirmButtonColor: "#d33",
       });
        }

    }
)

export default interceptorApiClient;
