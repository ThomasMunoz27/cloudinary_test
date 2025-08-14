import { useNavigate } from "react-router"
import { useStoreModal } from "../../../store/useStoreModal"
import { ModalAddFile } from "../modals/modalAddFile/ModalAddFile"
import { ModalLoginRegister } from "../modals/ModalLoginRegister/ModalLoginRegister"
import styles from "./Header.module.css"
import { MenuSideBar } from "../modals/MenuSideBar/MenuSideBar"
import { useStoreListCategories } from "../../../store/useStoreListCategories"
import { useStoreUser } from "../../../store/useStoreUser"


export const Header = () => {
    
    const {openModalAddFile, openModalLoginRegister, openModalMenuSideBar, closeModalMenuSideBar} = useStoreModal()
    const {modalAddFile, modalLoginRegister, modalMenuSideBar} = useStoreModal()
    const {loguedUser} = useStoreUser()
    const navigate = useNavigate()

    const {clearActiveCategory} = useStoreListCategories()

    const handleClick = () => {
        openModalAddFile()
    }

    const handleNavigate = () =>{
        navigate("/")
        clearActiveCategory()
    }

    const hanldeUserNavigate = () => {
        navigate("/user/profile")
    }
    
  
    return (

        <header className={styles.header}>
            <div className={styles.leftSide}>
                <h2 className={styles.logo} onClick={handleNavigate}>Cloudinary Test</h2>
            </div>

            <div className={styles.rightSide}>
                <button className={styles.addImageButton} onClick={handleClick}>Añadir Imagen</button>

            {/* Si hay un usuario logueado, el boton redirije al Perfil */}
                {loguedUser 
                ? (
                    <img className={styles.accountIcon} src={loguedUser.linkProfileImg ? loguedUser.linkProfileImg : "/account_circle.svg"} alt="" onClick={hanldeUserNavigate} />
                )
                : (
                        <img className={styles.accountIcon} src="/account_circle.svg" alt="" onClick={openModalLoginRegister}/>
                )
                }

                <img className={styles.accountIcon} src="/menu.svg" alt="" onClick={openModalMenuSideBar}/>

            </div>

        {modalAddFile && <div className={styles.modalBackdrop}><ModalAddFile></ModalAddFile></div>}
        {modalLoginRegister && <div className={styles.modalBackdrop}><ModalLoginRegister></ModalLoginRegister></div>}
        {modalMenuSideBar && (
            <>
                <div className={styles.modalBackdrop} onClick={closeModalMenuSideBar}>
                </div>
                    <MenuSideBar></MenuSideBar>
            </>
        )}
        </header>

  )
}
