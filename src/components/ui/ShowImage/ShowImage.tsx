import { useStoreImages } from "../../../store/useStoreImages"
import styles from "./ShowImage.module.css"

export const ShowImage = () => {

    const {image} = useStoreImages()

    console.log(image)

  return (
    <>

        <div className={styles.principalContainer}>
            <h2 className={styles.title}>Vista de la imagen</h2>

            <div className={styles.imageWrapper}>
                <h3>{image?.name}</h3>
                <img className={styles.showedImage} src={image?.link} alt={image?.name} />
                <div className={styles.reactionsContainer}>
                    
                        <p>
                            <img src="public\thumb_up.svg" alt="like"  className={styles.reactionIcon}/> 
                            <span>{image?.likes}</span>
                            
                        </p>
                        <p>
                            <img src="public\thumb_down.svg" alt="dislike"  className={styles.reactionIcon}/> 
                            <span>{image?.dislike}</span>
                            
                        </p>
                    
                </div>

                <div className={styles.imageDescription}>
                    <p>{image?.description}</p>
                </div>
                <div className={styles.authorSeccion}>
                    <p>Imagen subida por: {image?.userId.username}</p>
                </div>
            </div>
        </div>
    </>
  )
}
