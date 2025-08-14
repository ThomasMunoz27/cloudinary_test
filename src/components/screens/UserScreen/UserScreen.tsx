import { useStoreUser } from '../../../store/useStoreUser'
import { Header } from '../../ui/Header/Header'
import { ShowUser } from '../../ui/ShowUser/ShowUser'
import styles from './UserScreen.module.css'

export const UserScreen = () => {

    const {loguedUser, activeUser} = useStoreUser()

  return (
    <>
        <div className={styles.userScreenContainer}>
            <Header></Header>
            <ShowUser user={activeUser ?  activeUser : loguedUser!}></ShowUser>
        </div>
    </>
)
}
