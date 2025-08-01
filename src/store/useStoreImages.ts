import { create } from "zustand";
import { IImage } from "../types/IImage";
import { persist } from "zustand/middleware";
import { getAllImages } from "../cruds/crudImage";

interface IUseStoreImages {

    image: IImage | null

    images: IImage[]

    setImage: (incomingImage:IImage) => void

    fetchImagesStore: () => void
}


export const useStoreImages = create<IUseStoreImages>()(
    persist (
        (set) => ({

            image:null,
            images: [],

            setImage: (incomingImage) => set({image: incomingImage}),

            fetchImagesStore: async () => set({images: await getAllImages()})


        }),
        {
        name: "image-storage"
        }
    )
);