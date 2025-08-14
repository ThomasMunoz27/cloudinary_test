import { FC } from 'react'
import { IUserDTOResponse } from '../../../types/IUserDTOResponse'
import styles from './ShowUser.module.css'


interface IShowUser {
    user: IUserDTOResponse
}

export const ShowUser:FC<IShowUser> = ({user}) => {

    const formattedDate = new Date(user.registerDate).toLocaleString('es-AR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})

  return (
    <>
        <div className={styles.showUserContainer}>
            <div className={styles.userPresentation}>
                <div className={styles.photoContainer}>
                    <img src={user.linkProfileImg ? user.linkProfileImg : "/account_circle.svg"} alt="" />
                    <h3>{user.username}</h3>
                </div>
                <div className={styles.extraData}>
                    <p>Imagenes publicadas: {user.imagesPublished.length}</p>
                    <p>Registrado el: {formattedDate}</p>
                </div>
            </div>
            
        </div>
    </>
  )
}
