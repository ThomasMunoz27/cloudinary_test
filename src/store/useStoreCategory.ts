import { create } from "zustand";
import { ICategory } from "../types/ICategory";


interface IUseStoreCategory {

    categories: ICategory[],
    setCategories: (categories: ICategory[]) => void
    
    categoriesIdSelected: number[]
    setCaregoriesIdSelected: (newList: number[]) => void
    clearCategoriesSelected:  () => void;


    addCategoriesSelected: (idCategory:number) => void
    removeCategoriesSelected: (idCategory:number) => void



}

export const useStoreCategory = create<IUseStoreCategory>((set) => ({

    categories: [],
    categoriesIdSelected:[],

    //agrega una categoria si no existe
    addCategoriesSelected: (idCategory) => 
        set((state) => {
            if(!state.categoriesIdSelected.includes(idCategory)){
                return{
                    categoriesIdSelected: [...state.categoriesIdSelected, idCategory]
                }
            }
            return state;
        }),
        
    
    //remueve una categoria si existe
    removeCategoriesSelected: (idCategory) => 
        set((state) => ({
            categoriesIdSelected: state.categoriesIdSelected.filter((catId) =>
                catId !== idCategory
        ),
        
        })),
    
    setCategories: (categories) => set({categories}),

    clearCategoriesSelected: () => set({ categoriesIdSelected: []}),
    setCaregoriesIdSelected: (newList) => set({categoriesIdSelected: newList})
}))