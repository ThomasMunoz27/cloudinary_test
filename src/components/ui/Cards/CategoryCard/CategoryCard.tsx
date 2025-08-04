import { FC } from 'react'
import { ICategory } from '../../../../types/ICategory'
import styles from './CategoryCard.module.css'
import { useStoreListCategories } from '../../../../store/useStoreListCategories'
import { useNavigate } from 'react-router'

interface ICategoryCard{
    category: ICategory
}

export const CategoryCard:FC<ICategoryCard> = ({category}) => {

    const {setActiveCategory} = useStoreListCategories()
    const navigate = useNavigate()

    const handleClickCategory = () => {
        setActiveCategory(category.id!)
        navigate("/")
    }

  return (
    <>
        <div className={styles.categoryCard} onClick={handleClickCategory}>
            <p>{category.name}</p>
        </div>
    </>
  )
}
