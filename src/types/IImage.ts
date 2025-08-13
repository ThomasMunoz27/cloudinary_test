import { ICategory } from "./ICategory";
import { IUser } from "./IUser";
import { IUserForImageDTO } from "./IUserForImageDTO";

export interface IImage {
    id: number,
    publicId: string,
    link: string,
    name: string,
    description: string,
    likes: number,
    dislike: number,
    dateUpload: Date,
    userId: IUserForImageDTO,
    categories: ICategory[]
}