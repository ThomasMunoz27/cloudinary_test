import { create } from "zustand"

interface IStoreModal {
    modalAddFile: boolean

    openModalAddFile: () => void
    closeModalAddFile: () => void

    modalSelectCategories: boolean

    openModalSelectCategories: () => void
    closeModalSelectCategories: () => void

}

export const useStoreModal = create<IStoreModal>((set) => ({

    //modal para crear y subir una imagen
    modalAddFile: false,

    openModalAddFile: () => set({modalAddFile: true}),
    closeModalAddFile: () => set({modalAddFile: false}),

    //sub modal para seleccionar las categorias
    modalSelectCategories: false,

    openModalSelectCategories: () => set({modalSelectCategories:true}),
    closeModalSelectCategories: () => set({modalSelectCategories:false})
})
)