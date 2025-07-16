import { create } from "zustand";
import { IImage } from "../types/IImage";

interface IUseStoreImages {

    image: IImage | null

    setImage: (incomingImage:IImage) => void

}


export const useStoreImages = create<IUseStoreImages>((set) => ({

    image:null,

    setImage: (incomingImage) => set({image: incomingImage})
}))