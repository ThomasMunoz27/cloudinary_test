import { create } from "zustand"

interface IStoreModal {
    modalAddFile: boolean

    openModalAddFile: () => void
    closeModalAddFile: () => void
}

export const useStoreModal = create<IStoreModal>((set) => ({

    modalAddFile: false,

    openModalAddFile: () => set({modalAddFile: true}),
    closeModalAddFile: () => set({modalAddFile: false})
})
)