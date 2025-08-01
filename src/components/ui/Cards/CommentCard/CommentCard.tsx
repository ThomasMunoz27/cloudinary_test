import { FC } from 'react'
import { ICommentDTOResponse } from '../../../../types/ICommentDTOResponse'
import styles from './CommentCard.module.css'

interface ICommentCard{
    comment: ICommentDTOResponse
}

export const CommentCard:FC<ICommentCard> = ({comment}) => {

    const formattedDate = new Date(comment.createdAt).toLocaleString('es-AR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
  return (
    
    <>
        <div className={styles.commentContainer}>
            <div className={styles.perfilSide}>
                <img src="/account_circle.svg" alt="fotoDePerfil" />
                <p>{comment.username}</p>
            </div>
            <div className={styles.contentSide}>
                <span className={styles.dateComment}>Comentado el {formattedDate}</span>
                <p>{comment.content}</p>
            </div>
        </div>
    </>
  )
}
