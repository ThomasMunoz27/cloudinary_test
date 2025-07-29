import { IReactionType } from "./Enums/IReactionType";
import { IImage } from "./IImage";
import { IUser } from "./IUser";

export interface IReaction{
    user: IUser,
    image: IImage,
    reactionType: IReactionType
}