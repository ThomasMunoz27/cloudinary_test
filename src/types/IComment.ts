import { IImage } from "./IImage";
import { IUser } from "./IUser";

export interface IComment{
    id?: number
    content: string,
    date: Date,
    user: IUser
    image: IImage
}