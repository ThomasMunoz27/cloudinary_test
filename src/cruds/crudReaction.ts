import interceptorApiClient from "../Interceptors/axios.interceptor"
import { IReactionType } from "../types/Enums/IReactionType"

export const reactToImage = async (idImage: number, reactionType: IReactionType)  => {
    const response = await interceptorApiClient.post(`/reaction/images/${idImage}?type=${reactionType}`)
    return response.data

}
