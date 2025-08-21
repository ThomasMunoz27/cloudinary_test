import interceptorApiClient from "../Interceptors/axios.interceptor"
import { ICommentPostRequest } from "../types/ICommentPostRequest"

export const getAllCommentByImageId = async (imageId: number) => {
    const response = await interceptorApiClient.get(`/comments/image/${imageId}`)
    return response.data
}

export const postCommentInImage = async (commentRequest: ICommentPostRequest) => {
    const response = await interceptorApiClient.post("comments/post", commentRequest)
    return response.data
}

export const deleteUserComment = async (commentId: number) => {
    const response = await interceptorApiClient.delete(`comments/delete/${commentId}`)
    return response.data
}