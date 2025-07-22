import { create } from "zustand";

interface IStoreLoginRegister{

    statusLoginRegister: string,


    setStatusLoginRegister: (newStatus: string) => void

}

export const useStoreLoginRegister = create<IStoreLoginRegister>((set) => ({
    statusLoginRegister: "",

    setStatusLoginRegister: (newStatus) => set({statusLoginRegister: newStatus})
}))