import { ICategory } from "./ICategory";


export interface IImageForUserDTO {
    id: number,
    link: string,
    publicId: string,
    name:  string,
    description: string,
    likes: number,
    dislike: number,
    dateUpload: Date,
    categories: ICategory[]

}