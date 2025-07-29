import interceptorApiClient from "../Interceptors/axios.interceptor"
import { IReactionType } from "../types/Enums/IReactionType"

export const reactToImage = async (idImage: number, reactionType: IReactionType)  => {
    const response = await interceptorApiClient.post(`/reaction/images/${idImage}?type=${reactionType}`)
    return response.data

}
//eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzUzODEwMTQ2LCJleHAiOjE3NTM4OTY1NDZ9.eNHPlvb5RA-8UZPpAePKkFTeBvuvcX7XWkU_mKF2cgQ