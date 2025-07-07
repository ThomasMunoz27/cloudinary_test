import { useEffect, useState } from "react"
import styles from "./ModalSelectCategories.module.css"
import { ICategory } from "../../../../types/ICategory"
import { getAllCategories } from "../../../../cruds/crudCategory"


export const ModalSelectCategories = () => {

    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(()=> {
        const fetchCategories = async () =>{
            const fetchedCategories = await getAllCategories()
            setCategories(fetchedCategories)
        }
        fetchCategories()
    }, [])

  return (
    <>
        <div className={styles.principalContainer}>
            <h4>Soy el sub modal de categorias</h4>
            {categories.map(category => (
                <p>{category.name}</p>
            ))}
        </div>
    </>
)
}
