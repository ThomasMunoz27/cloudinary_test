import { IImageForUserDTO } from "./IImageForUserDto";

export interface IUserDTOResponse{
    username: string,
    registerDate: Date,
    imagesPublished: IImageForUserDTO[],
    publicIdProfileImg: string,
    linkProfileImg: string
}