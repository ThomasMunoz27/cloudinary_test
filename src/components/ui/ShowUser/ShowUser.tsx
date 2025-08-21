import { FC, useEffect } from 'react'
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
    otherUserId?: number
}


export const ShowUser:FC<IShowUser> = ({user, otherUserId}) => {

    const {loguedUser, setActiveUser, activeUser} = useStoreUser()
    const {imagesUser} = useStoreImages()
    const {modalChangePhotoProfile, openModalChangePhotoProfile} = useStoreModal()

    const userShowed = activeUser ?? user

    const formattedDate = new Date(userShowed.registerDate).toLocaleString('es-AR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})

    useEffect(() => {
        if(otherUserId){
            setActiveUser(otherUserId)
            
        }
    },[otherUserId])

  return (
    <>
        <div className={styles.showUserContainer}>
            
            <div className={styles.userPresentation}>
                <div className={styles.profileHeader}>
                    
                    {loguedUser!.id === userShowed.id && (
                        <div className={styles.changeProfilePhotoContainer}>
                            <button className={styles.addImageButton} onClick={openModalChangePhotoProfile}>Cambiar Foto de Perfil</button>
                        </div>)
                    }
                    

                    <div className={styles.photoContainer}>
                        <img src={userShowed.linkProfileImg ? userShowed.linkProfileImg : "/account_circle.svg"} alt="" />
                        <h3>{userShowed.username}</h3>
                    </div>
                    <div className={styles.extraData}>
                        <p>Imagenes publicadas: {userShowed.cantImagesPublished}</p>
                        <p>Registrado el: {formattedDate}</p>
                    </div>

                </div>
                <div className={styles.userImages}>

                    <ListImages images={imagesUser?.content || []}></ListImages>
                    {loguedUser!.id === userShowed.id
                    ? (
                        <Pagination whereFrom='user'></Pagination>

                    )
                    : (
                        <Pagination whereFrom='ownUser'></Pagination>
                    )}
                </div>
            </div>
            
            {modalChangePhotoProfile && <div className={styles.modalBackdrop}> <ModalChangePhotoProfile></ModalChangePhotoProfile></div>}

        </div>
    </>
  )
}
