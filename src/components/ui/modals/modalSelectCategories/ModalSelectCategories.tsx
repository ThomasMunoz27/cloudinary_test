import { useEffect, useState } from "react"
import styles from "./ModalSelectCategories.module.css"
import { getAllCategories } from "../../../../cruds/crudCategory"
import { useStoreCategory } from "../../../../store/useStoreCategory"
import { useStoreModal } from "../../../../store/useStoreModal"
import { ICategory } from "../../../../types/ICategory"


export const ModalSelectCategories = () => {

    const {closeModalSelectCategories} = useStoreModal()
    const {categoriesIdSelected ,addCategoriesSelected, removeCategoriesSelected, setCategories, categories, setCaregoriesIdSelected} = useStoreCategory()

    //estado previo para volver en caso de cancelar la seleccion
    const [previusStateCategories, setPreviusStateCategories] = useState<number[]>([])

    //estado para barra de busqueda
    const[search, setSearch] = useState("")
    const [searchSugestions, setSearchSugestions] = useState<ICategory[]>([])
    


    const handleCancelAndClose = () => {
        console.log(previusStateCategories)

        setCaregoriesIdSelected(previusStateCategories)
        closeModalSelectCategories()
    }


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        setSearch(value)

        if(value.trim().length > 0){
            const filteredCategories = categories.filter(category =>
                category.name.toLowerCase().includes(value.toLowerCase()) && 
                !categoriesIdSelected.includes(category.id!)
            ).slice(0, 10)
            setSearchSugestions(filteredCategories)
        }else{
            setSearchSugestions([])
        }
    }

    useEffect(()=> {
        const fetchCategories = async () =>{
            const fetchedCategories = await getAllCategories()
            setCategories(fetchedCategories)
        }
        fetchCategories()
        setPreviusStateCategories([...categoriesIdSelected])
    }, [])

  return (
    <>
        <div className={styles.principalContainer}>
            <h4>Soy el sub modal de categorias</h4>
            {/* Barra de busqueda para categorias */}
            <input type="text" placeholder="Busque categorias" value={search}
            onChange={handleSearch}/>


            {/* Muestra las categorias elejidas */}
            <div className={styles.categoriesSelectedContainer}>
                {categoriesIdSelected.map(categoryId => {
                    const category = categories.find(cat => cat.id === categoryId)
                    if (!category) return null
                    return(
                    
                        <label key={category.id} className={`${styles.categoryLabel} ${styles.selected}`}
                        onClick={()=> removeCategoriesSelected(category.id!)}>

                            <span>{category.name}</span>
                        </label>
                        
                )})}

            </div>


            {/* Contenedor para categorias a elegir */}
            <div className={styles.categoriesToSelect}>
                
                {(searchSugestions.length > 0 ? searchSugestions : categories.slice(0,5)).map(category => {
                    const isSelected = categoriesIdSelected.includes(category.id!)
                    if(isSelected) return null
                    return(
                    
                        <label key={`${category.id}-B`} className={`${styles.categoryLabel} ${styles.notSelected} ${isSelected ? styles.selected : ""}`}
                        onClick={()=> isSelected
                            ? removeCategoriesSelected(category.id!)
                            : addCategoriesSelected(category.id!)
                            }>

                            <span>{category.name}</span>
                        </label>
                        
                )})}

            </div>

            <div className={styles.containerButtons}>
                <button onClick={handleCancelAndClose}>Cancelar</button>
                <button onClick={()=> closeModalSelectCategories()}>Aceptar</button>
            </div>
        </div>
    </>
)
}
