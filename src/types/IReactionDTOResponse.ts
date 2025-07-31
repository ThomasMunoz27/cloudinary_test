import { IReactionType } from "./Enums/IReactionType";


export interface IReactionDTOResponse{
    id: number,
    userId: number,
    imageId: number,
    reactionType: IReactionType | null,
    likes: number,
    dislikes: number
}