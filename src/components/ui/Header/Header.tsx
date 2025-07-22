import { useStoreModal } from "../../../store/useStoreModal"
import styles from "./Header.module.css"


export const Header = () => {
    
    const {openModalAddFile, openModalLoginRegister} = useStoreModal()
    

    const handleClick = () => {
        openModalAddFile()
    }

    
  
    return (

        <header className={styles.header}>
            <div className={styles.leftSide}>
                <h2>Cloudinary Test</h2>
            </div>

            <div className={styles.rightSide}>
                <button className={styles.addImageButton} onClick={handleClick}>Añadir Imagen</button>

                <img className={styles.accountIcon} src="public\account_circle.svg" alt="" onClick={openModalLoginRegister}/>

            </div>

            
        </header>

  )
}
