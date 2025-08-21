import { create } from "zustand";
import { IUserDTOResponse } from "../types/IUserDTOResponse";
import { getUserProfileById, getUserProfileByToken } from "../cruds/crudUser";
import { persist } from "zustand/middleware";

interface IUseStoreUser {
    loguedUser: IUserDTOResponse | null
    setLoguedUser: () => void
    clearLoguedUser: () =>  void

    activeUser: IUserDTOResponse | null
    setActiveUser: (userId: number) => void
    clearActiveUser: () => void

}


export const useStoreUser = create<IUseStoreUser>()(
    persist(
        (set)=> ({
            loguedUser: null,
            activeUser: null,

            setLoguedUser: async () => set({loguedUser: await getUserProfileByToken()}),

            clearLoguedUser: () => set({loguedUser:null}),


            setActiveUser: async (userId) => set({activeUser: await getUserProfileById(userId)}),
            clearActiveUser: () => set({activeUser:null})
        }),
        {
            name:"user-store"
        }
    )
)