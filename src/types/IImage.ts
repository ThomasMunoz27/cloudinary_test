import { ICategory } from "./ICategory";
import { IUser } from "./IUser";

export interface IImage {
    id: number,
    link: string,
    publicId: string,
    name: string,
    description: string,
    likes: number,
    dislike: number,
    dateUpload: Date,
    userId: IUser,
    categories: ICategory[]
}