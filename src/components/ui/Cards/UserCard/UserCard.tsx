import { FC } from 'react'
import { IUserDTOResponse } from '../../../../types/IUserDTOResponse'
import styles from './UserCard.module.css'
import { useStoreUser } from '../../../../store/useStoreUser'
import { useNavigate } from 'react-router'

interface IUserCard{
    user: IUserDTOResponse
}

export const UserCard:FC<IUserCard> = ({user}) => {

    const {setActiveUser} = useStoreUser()
    const navigate = useNavigate()


        const handleClickUser= async () => {
        await setActiveUser(user.id)
        navigate(`/profile/${user.id}`)
    }

  return (
    <>
        <div className={styles.userCardContainer}>
            <div className={styles.contentContainer} onClick={handleClickUser}>
                <img src={user.linkProfileImg ? user.linkProfileImg : "/account_circle.svg"} alt="" />
                <p className={styles.userName}>{user.username}</p>
            </div>
        </div>
    </>
)
}
