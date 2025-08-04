import interceptorApiClient from "../Interceptors/axios.interceptor";
import { ICategory } from "../types/ICategory";


export const getAllCategories = async (): Promise<ICategory[]> => {
    const response = await interceptorApiClient.get("/categories")
    return response.data
}

export const getCategoryById = async (idCategory: number) => {
    const response = await interceptorApiClient.get(`/categories/${idCategory}`)
    return response.data
}