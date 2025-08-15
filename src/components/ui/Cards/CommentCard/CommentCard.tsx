import { FC } from 'react'
import { ICommentDTOResponse } from '../../../../types/ICommentDTOResponse'
import styles from './CommentCard.module.css'
import { useStoreUser } from '../../../../store/useStoreUser'
import { useNavigate } from 'react-router'

interface ICommentCard{
    comment: ICommentDTOResponse
}

export const CommentCard:FC<ICommentCard> = ({comment}) => {

    const navigate = useNavigate()
    const {setActiveUser} = useStoreUser()

    const formattedDate = new Date(comment.createdAt).toLocaleString('es-AR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})

    const handleClickUserComment = async () => {
        await setActiveUser(comment.userId)
        navigate("/user/profile")
    }
  return (
    
    <>
        <div className={styles.commentContainer}>
            <div className={styles.perfilSide}>
                <img src="/account_circle.svg" alt="fotoDePerfil" />
                <p className={styles.perfilUsername} onClick={handleClickUserComment}>{comment.username}</p>
            </div>
            <div className={styles.contentSide}>
                <span className={styles.dateComment}>Comentado el {formattedDate}</span>
                <p>{comment.content}</p>
            </div>
        </div>
    </>
  )
}
