import interceptorApiClient from "../Interceptors/axios.interceptor"
import { IUser } from "../types/IUser";


export const getAllUsers = async ():Promise<IUser[]> => {
    const response = await interceptorApiClient.get("/users");
    return response.data
}