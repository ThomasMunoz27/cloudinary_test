import { useStoreModal } from "../../store/useStoreModal"
import styles from "./Header.module.css"

export const Header = () => {
    
    const {openModalAddFile} = useStoreModal()


    const handleClick = () => {
        openModalAddFile()
    }
  
    return (

        <header className={styles.header}>
            <div>
                <h2>Cloudinary Test</h2>
            </div>

            <button className={styles.addImageButton} onClick={handleClick}>Añadir Imagen</button>
        </header>

  )
}
