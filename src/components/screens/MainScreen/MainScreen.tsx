import { useEffect } from 'react'
import { Header } from '../../ui/Header/Header'
import { ListImages } from '../../ui/ListImages/ListImages'
import styles from "./MainScreen.module.css"
import { useStoreImages } from '../../../store/useStoreImages'
import { Pagination } from '../../ui/Pagination/Pagination'

export const MainScreen = () => {

 

    const {images, fetchImagesStore}= useStoreImages()


    //fetch images proovisional
    useEffect (()=>{
      fetchImagesStore(0, 2)
      
    },[])

  return (
    <>
    <div className={styles.pageContainer}>

        <Header></Header>

        <ListImages images={images.content}></ListImages>
        <Pagination></Pagination>
    </div>
    </>
)
}
