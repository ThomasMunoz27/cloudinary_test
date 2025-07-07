import { useEffect, useState } from 'react'
import { useStoreModal } from '../../../store/useStoreModal'
import { Header } from '../../ui/Header/Header'
import { ModalAddFile } from '../../ui/modals/ModalAddFile'
import { IImage } from '../../../types/IImage'
import { getAllImages } from '../../../cruds/crudImage'
import { ListImages } from '../../ui/ListImages/ListImages'

export const MainScreen = () => {

    const {modalAddFile} = useStoreModal()

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
        {/* aqui va a ir un mapeo de las imagenes de cloudinary <imageCard/> */}
        {modalAddFile && <ModalAddFile></ModalAddFile>}
    </>
)
}
