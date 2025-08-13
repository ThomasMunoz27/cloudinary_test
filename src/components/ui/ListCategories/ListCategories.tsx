import styles from './ListCategories.module.css'
import { useStoreListCategories } from '../../../store/useStoreListCategories'
import { CategoryCard } from '../Cards/CategoryCard/CategoryCard'
import { useEffect } from 'react'
import { Header } from '../Header/Header'



export const ListCategories = () => {

    const {categories, setCategories} = useStoreListCategories()

    useEffect(()=> {
        setCategories()
    },[])
  return (
    <>
    <Header></Header>
    <div>
        <div className={styles.title}>
            <h2>Categorías</h2>
        </div>
        <div className={styles.listCategories}>
            {categories.map(category => (
                <CategoryCard key={category.id!} category={category}></CategoryCard>
            ))}
        </div>
    </div>
    </>
  )
}
