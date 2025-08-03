import { create } from "zustand";
import { IImage } from "../types/IImage";
import { persist } from "zustand/middleware";
import {getAllImagesPaged } from "../cruds/crudImage";
import { IPage } from "../types/IPage";

interface IUseStoreImages {

    image: IImage | null

    images: IPage<IImage>

    setImage: (incomingImage:IImage) => void

    fetchImagesStore: (categoryId?: number) => void
}


export const useStoreImages = create<IUseStoreImages>()(
    persist (
        (set) => ({

            image:null,
            images: {
                        content: [],
                        totalPages: 0,
                        totalElements: 0,
                        size: 10,
                        number: 0
                    },

            setImage: (incomingImage) => set({image: incomingImage}),

            fetchImagesStore: async (categoryId) => set({images: await getAllImagesPaged(0, 2, categoryId)})


        }),
        {
        name: "image-storage"
        }
    )
);