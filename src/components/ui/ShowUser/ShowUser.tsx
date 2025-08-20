import { FC } from 'react'
import { IUserDTOResponse } from '../../../types/IUserDTOResponse'
import styles from './ShowUser.module.css'

import { ListImages } from '../ListImages/ListImages'
import { Pagination } from '../Pagination/Pagination'
import { useStoreImages } from '../../../store/useStoreImages'
import { useStoreModal } from '../../../store/useStoreModal'
import { ModalChangePhotoProfile } from '../modals/ModalChangePhotoProfile/ModalChangePhotoProfile'
import { useStoreUser } from '../../../store/useStoreUser'


interface IShowUser {
    user: IUserDTOResponse
}


export const ShowUser:FC<IShowUser> = ({user}) => {

    const {loguedUser} = useStoreUser()
    const {imagesUser} = useStoreImages()
    const {modalChangePhotoProfile, openModalChangePhotoProfile} = useStoreModal()


    const formattedDate = new Date(user.registerDate).toLocaleString('es-AR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})


  return (
    <>
        <div className={styles.showUserContainer}>
            
            <div className={styles.userPresentation}>
                <div className={styles.profileHeader}>
                    
                    {loguedUser!.id === user.id && (
                        <div className={styles.changeProfilePhotoContainer}>
                            <button className={styles.addImageButton} onClick={openModalChangePhotoProfile}>Cambiar Foto de Perfil</button>
                        </div>)
                    }
                    

                    <div className={styles.photoContainer}>
                        <img src={user.linkProfileImg ? user.linkProfileImg : "/account_circle.svg"} alt="" />
                        <h3>{user.username}</h3>
                    </div>
                    <div className={styles.extraData}>
                        <p>Imagenes publicadas: {user.cantImagesPublished}</p>
                        <p>Registrado el: {formattedDate}</p>
                    </div>

                </div>
                <div className={styles.userImages}>

                    <ListImages images={imagesUser?.content || []}></ListImages>
                    <Pagination whereFrom=''></Pagination>
                </div>
            </div>
            
            {modalChangePhotoProfile && <div className={styles.modalBackdrop}> <ModalChangePhotoProfile></ModalChangePhotoProfile></div>}

        </div>
    </>
  )
}
