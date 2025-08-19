import { FC, useEffect, useState } from 'react'
import { IUserDTOResponse } from '../../../types/IUserDTOResponse'
import styles from './ShowUser.module.css'
import { IPage } from '../../../types/IPage'
import { getPagedImagesByUserId } from '../../../cruds/crudUser'
import { ListImages } from '../ListImages/ListImages'
import { IImage } from '../../../types/IImage'
import { Pagination } from '../Pagination/Pagination'
import { useStoreImages } from '../../../store/useStoreImages'


interface IShowUser {
    user: IUserDTOResponse
}


export const ShowUser:FC<IShowUser> = ({user}) => {

    const {imagesUser} = useStoreImages()

    const [pagedUserImages, setPagedUserImages] = useState<IPage<IImage>>()

    const formattedDate = new Date(user.registerDate).toLocaleString('es-AR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})


    //busca las imagenes del usuario
    useEffect(() => {
        const fetchUserImages = async () => {
            const pagedImages = await getPagedImagesByUserId(user.id, 0,2)
            setPagedUserImages(pagedImages)
        }

        fetchUserImages()
    }, [])

  return (
    <>
        <div className={styles.showUserContainer}>
            
            <div className={styles.userPresentation}>
                <div className={styles.changeProfilePhotoContainer}>
                    <button className={styles.addImageButton}>Cambiar Foto de Perfil</button>
                </div>
                <div className={styles.profileHeader}>
                    <div className={styles.photoContainer}>
                        <img src={user.linkProfileImg ? user.linkProfileImg : "/account_circle.svg"} alt="" />
                        <h3>{user.username}</h3>
                    </div>
                    <div className={styles.extraData}>
                        <p>Imagenes publicadas: {pagedUserImages?.content.length}</p>
                        <p>Registrado el: {formattedDate}</p>
                    </div>

                </div>
                <div className={styles.userImages}>

                    <ListImages images={imagesUser?.content || []}></ListImages>
                    <Pagination whereFrom=''></Pagination>
                </div>
            </div>
            
        </div>
    </>
  )
}
