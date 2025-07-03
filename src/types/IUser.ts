import { IPrivileges } from "./Enums/IPrivileges";

export interface IUser{
    id?: number,
    email: string,
    password: string,
    username: string,
    registerDate: Date,
    privileges: IPrivileges
}