import { create } from "zustand";
import { IImage } from "../types/IImage";
import { persist } from "zustand/middleware";
import {getAllImagesPaged } from "../cruds/crudImage";
import { IPage } from "../types/IPage";
import { getPagedImagesByUserId } from "../cruds/crudUser";

interface IUseStoreImages {

    image: IImage | null

    images: IPage<IImage>

    imagesUser: IPage<IImage>

    setImage: (incomingImage:IImage) => void

    fetchImagesStore: (page: number, size: number, categoryId?: number) => Promise<IPage<IImage>>

    fetchImagesUserStore: (userId: number, page: number, size: number) => Promise<IPage<IImage>>
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
            imagesUser:{
                        content: [],
                        totalPages: 0,
                        totalElements: 0,
                        size: 10,
                        number: 0
                    },

            setImage: (incomingImage) => set({image: incomingImage}),

            fetchImagesStore: async (page, size, categoryId) => {
				const response = await getAllImagesPaged(page, size, categoryId);
				set({ images: response });
				return response; // ⚡ devuelve el resultado
			},

            fetchImagesUserStore: async (userId, page, size) => {
                const response =  await getPagedImagesByUserId(userId, page, size)
                set({imagesUser: response})
                return response
        }
        }),
        {
        name: "image-storage"
        }
    )
);