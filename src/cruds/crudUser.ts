import interceptorApiClient from "../Interceptors/axios.interceptor"
import { IUser } from "../types/IUser";
import { IUserDTOResponse } from "../types/IUserDTOResponse";


export const getAllUsers = async ():Promise<IUser[]> => {
    const response = await interceptorApiClient.get("/users");
    return response.data
}

export const getUserProfileById = async(userId: number):Promise<IUserDTOResponse> => {
    const response = await interceptorApiClient.get(`users/profile/${userId}`)
    return response.data
}

export const getUserProfileByToken = async () => {
    const response = await interceptorApiClient.get("users/login/profile")
    return response.data
}