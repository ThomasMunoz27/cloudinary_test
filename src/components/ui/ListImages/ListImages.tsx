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
        <div>
	          <h2 className={styles.title}>Imágenes</h2>
        </div>
        <div className={styles.listImages}>
            {images.map(image => (
                <ImageCard key={image.id} image={image}></ImageCard>
            ))}
        </div>
    
    </>
  )
}
