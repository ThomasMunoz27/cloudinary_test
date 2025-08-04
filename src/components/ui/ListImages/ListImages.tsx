import { FC } from "react"
import { IImage } from "../../../types/IImage"
import styles from "./ListImages.module.css"
import { ImageCard } from "../Cards/ImageCard/ImageCard"
import { useStoreListCategories } from "../../../store/useStoreListCategories"

interface IListImages{
    images: IImage[]
}

export const ListImages:FC<IListImages> = ({images}) => {

    const {activeCategory} = useStoreListCategories()

  return (
    <>
        <div>
            {activeCategory 
            ? (<>
                <h2 className={styles.title}>Imagenes con categoria {activeCategory.name}</h2>
                <p className={styles.categoryDescription}>{activeCategory.description}</p>
              </>)
            : (<>
              	<h2 className={styles.title}>Imágenes</h2>
              </>)
            }
        </div>
        <div className={styles.listImages}>
            {images.map(image => (
                <ImageCard key={image.id} image={image}></ImageCard>
            ))}
        </div>
    
    </>
  )
}
