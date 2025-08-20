import { create } from "zustand"

interface IStoreModal {
    modalAddFile: boolean

    openModalAddFile: () => void
    closeModalAddFile: () => void

    modalSelectCategories: boolean

    openModalSelectCategories: () => void
    closeModalSelectCategories: () => void


    modalLoginRegister: boolean

    openModalLoginRegister: () => void
    closeModalLoginRegister: () => void

    modalMenuSideBar: boolean,

    openModalMenuSideBar: () => void,
    closeModalMenuSideBar: () => void

    modalChangePhotoProfile: boolean,

    openModalChangePhotoProfile: () => void,
    closeModalChangePhotoProfile:  () => void
}

export const useStoreModal = create<IStoreModal>((set) => ({

    //modal para crear y subir una imagen
    modalAddFile: false,

    openModalAddFile: () => set({modalAddFile: true}),
    closeModalAddFile: () => set({modalAddFile: false}),

    //sub modal para seleccionar las categorias
    modalSelectCategories: false,

    openModalSelectCategories: () => set({modalSelectCategories:true}),
    closeModalSelectCategories: () => set({modalSelectCategories:false}),

    modalLoginRegister: false,

    openModalLoginRegister: () => set({modalLoginRegister:true}),
    closeModalLoginRegister:() => set({modalLoginRegister: false}),

    modalMenuSideBar: false,

    openModalMenuSideBar: () => set({modalMenuSideBar:true}),
    closeModalMenuSideBar: () => set({modalMenuSideBar:false}),

    modalChangePhotoProfile: false,

    openModalChangePhotoProfile: () => set({modalChangePhotoProfile: true}),
    closeModalChangePhotoProfile: () => set({modalChangePhotoProfile: false}),

})
)