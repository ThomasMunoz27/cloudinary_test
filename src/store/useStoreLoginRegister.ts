import { create } from "zustand";

interface IStoreLoginRegister{
    //estado para formulario
    statusLoginRegister: string,

    setStatusLoginRegister: (newStatus: string) => void

    //estado para usuario Logueado
    //userLogued
}

export const useStoreLoginRegister = create<IStoreLoginRegister>((set) => ({
    statusLoginRegister: "",

    setStatusLoginRegister: (newStatus) => set({statusLoginRegister: newStatus})
}))