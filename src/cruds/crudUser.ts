import interceptorApiClient from "../Interceptors/axios.interceptor"
import { IImage } from "../types/IImage";
import { IPage } from "../types/IPage";
import { IUser } from "../types/IUser";
import { IUserDTOResponse } from "../types/IUserDTOResponse";


export const getAllUsers = async ():Promise<IUser[]> => {
    const response = await interceptorApiClient.get("/users");
    return response.data
}

export const getAllUsersDto = async ():Promise<IUserDTOResponse[]> => {
    const response = await interceptorApiClient.get("/users/all")
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

export const getPagedImagesByUserId = async (userId:number, page: number, size: number):Promise<IPage<IImage>> => {
    const response = await interceptorApiClient.get(`/users/profile/images/${userId}?page=${page}&size=${size}`)
    return response.data
}

export const putPhotoProfileImage = async (formData: FormData) => {
    const response = await interceptorApiClient.put(`users/profile/photo`, formData,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}