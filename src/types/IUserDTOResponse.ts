import { IPrivileges } from "./Enums/IPrivileges"

export interface IUserDTOResponse{
    id: number,
    username: string,
    registerDate: Date,
    publicIdProfileImg: string,
    linkProfileImg: string
    cantImagesPublished: number
    privileges: IPrivileges
}