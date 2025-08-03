import { useEffect } from 'react'
import { Header } from '../../ui/Header/Header'
import { ListImages } from '../../ui/ListImages/ListImages'
import styles from "./MainScreen.module.css"
import { useStoreImages } from '../../../store/useStoreImages'

export const MainScreen = () => {

 

    const {images, fetchImagesStore}= useStoreImages()


    //fetch images proovisional
    useEffect (()=>{
      fetchImagesStore()
      
    },[])

  return (
    <>
        <Header></Header>

        <ListImages images={images.content}></ListImages>

    </>
)
}
