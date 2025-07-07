import { FC } from "react"
import { IImage } from "../../../types/IImage"
import styles from "./ListImages.module.css"
import { ImageCard } from "../Cards/ImageCard/ImageCard"

interface IListImages{
    images: IImage[]
}

export const ListImages:FC<IListImages> = ({images}) => {


  return (
    <>
        <h2>IMAGENES</h2>
        <div>
        </div>
        <div className={styles.listImages}>
            {images.map(image => (
                <ImageCard image={image}></ImageCard>
            ))}
        </div>
    
    </>
  )
}
