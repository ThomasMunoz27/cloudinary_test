import { FC } from 'react'
import { useStoreUser } from '../../../store/useStoreUser'
import { Header } from '../../ui/Header/Header'
import { ShowUser } from '../../ui/ShowUser/ShowUser'
import styles from './UserScreen.module.css'
import { useParams } from 'react-router'

interface IUserScreen{
    isOwnProfile: boolean
}

export const UserScreen:FC<IUserScreen> = ({isOwnProfile}) => {

    const {id} = useParams<{id: string}>()

    const {loguedUser} = useStoreUser()

  return (
    <>
        <div className={styles.userScreenContainer}>
            <Header></Header>
            {isOwnProfile 
            ? (
                <ShowUser user={loguedUser!} otherUserId={loguedUser?.id}></ShowUser>
            )
            :(
                <ShowUser user={loguedUser!} otherUserId={Number(id)}></ShowUser>

            )}
        </div>
    </>
)
}
