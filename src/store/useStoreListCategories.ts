import { create } from "zustand";
import { ICategory } from "../types/ICategory";
import { getAllCategories, getCategoryById } from "../cruds/crudCategory";

interface IUseStoreListCategories{

    categories: ICategory[],
    setCategories: () => void,

    activeCategory: ICategory | null,
    setActiveCategory: (idCategory: number) => void
    clearActiveCategory: () => void
}


export const useStoreListCategories = create<IUseStoreListCategories>((set)=> ({
    categories: [],

    activeCategory: null,

    setCategories: async () => set({categories: await getAllCategories()}),

    
    setActiveCategory: async (idCategory) => set({activeCategory: await getCategoryById(idCategory)}),

    clearActiveCategory: () => set({activeCategory: null})
})) 