import { FC } from "react"
import { IImage } from "../../../../types/IImage"
import styles from "./ImageCard.module.css"

interface IImageCard{
    image: IImage
}

export const ImageCard:FC<IImageCard> = ({image}) => {
  return (
    <>
        <div className={styles.cardImage}>

            <img className={styles.showImage} src={image.link ? image.link : "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/a/a3/FB_IMG_1596591789564.jpg/revision/latest/thumbnail/width/360/height/360?cb=20200806023457&path-prefix=es"} alt="" />

            <p>{image.name}</p>
        </div>
    </>
  )
}
