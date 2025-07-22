import { useEffect, useState } from 'react'
import { useStoreModal } from '../../../store/useStoreModal'
import { Header } from '../../ui/Header/Header'
import { ModalAddFile } from '../../ui/modals/modalAddFile/ModalAddFile'
import { IImage } from '../../../types/IImage'
import { getAllImages } from '../../../cruds/crudImage'
import { ListImages } from '../../ui/ListImages/ListImages'
import { ModalLoginRegister } from '../../ui/modals/ModalLoginRegister/ModalLoginRegister'
import styles from "./MainScreen.module.css"

export const MainScreen = () => {

    const {modalAddFile, modalLoginRegister} = useStoreModal()

    const [images, setImages]= useState<IImage[]>([])

    //fetch images proovisional
    useEffect (()=>{
      const fetchImages = async() => {
        const images = await getAllImages()
        setImages(images)
      }
      fetchImages()
    },[])

  return (
    <>
        <Header></Header>

        <ListImages images={images}></ListImages>

        {modalAddFile && <div className={styles.modalBackdrop}><ModalAddFile></ModalAddFile></div>}
        {modalLoginRegister && <div className={styles.modalBackdrop}><ModalLoginRegister></ModalLoginRegister></div>}
    </>
)
}
