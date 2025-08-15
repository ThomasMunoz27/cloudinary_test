import interceptorApiClient from "../Interceptors/axios.interceptor"
import { IImage } from "../types/IImage"


export const getAllImages = async (): Promise<IImage[]> => {
    const response = await interceptorApiClient.get("/images")
    return response.data
}

export const getImageById = async (idImage: number): Promise<IImage> => {
    const response = await interceptorApiClient.get(`/images/${idImage}`)
    return response.data
}

export const postImageCloudinary = async (formData: FormData) => {
    const response = await interceptorApiClient.post(`/images/upload`, formData,  {
        headers:{
            "Content-Type": "multipart/form-data"
        },
    })
    return response.data
}


export const getAllImagesPaged = async (page: number, size: number, categoryId?: number) => {
    try{
        if(categoryId){
            const response = await interceptorApiClient.get(`/images/paged?page=${page}&size=${size}&categoryId=${categoryId}`)
            console.log(response.data)
            return response.data
        }else{
            const response = await interceptorApiClient.get(`/images/paged?page=${page}&size=${size}`)
                        console.log(response.data)

            return response.data
        }
    }catch (error){
        console.error(`Error en getAllImagesPaged`, error)
    }
}

