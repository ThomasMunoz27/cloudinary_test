import { useEffect } from 'react'
import { ListImages } from '../../ui/ListImages/ListImages'
import styles from "./MainScreen.module.css"
import { useStoreImages } from '../../../store/useStoreImages'
import { Pagination } from '../../ui/Pagination/Pagination'
import { useStoreListCategories } from '../../../store/useStoreListCategories'

export const MainScreen = () => {

 

    const {images, fetchImagesStore}= useStoreImages()
      const {activeCategory} = useStoreListCategories()

      const triggerFetchImages = async () =>{
        await fetchImagesStore(0, 8, activeCategory?.id)
        console.log("Buscando imagenes")
      }
    //fetch images proovisional
    useEffect (()=>{
      triggerFetchImages()

    },[activeCategory])

  return (
    <>
    <div className={styles.pageContainer}>


        <ListImages images={images?.content || []}></ListImages>
        <Pagination whereFrom='Main'></Pagination>
    </div>
    </>
)
}
