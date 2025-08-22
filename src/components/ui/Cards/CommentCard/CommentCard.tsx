import { FC } from 'react'
import { ICommentDTOResponse } from '../../../../types/ICommentDTOResponse'
import styles from './CommentCard.module.css'
import { useStoreUser } from '../../../../store/useStoreUser'
import { useNavigate } from 'react-router'
import { deleteUserComment } from '../../../../cruds/crudComments'
import { swalError } from '../../../../utils/swalError'
import { swalSucces } from '../../../../utils/swalSucces'

interface ICommentCard{
    comment: ICommentDTOResponse
    comments: ICommentDTOResponse[]
    setComments: React.Dispatch<React.SetStateAction<ICommentDTOResponse[]>>
}

export const CommentCard:FC<ICommentCard> = ({comment, comments, setComments}) => {

    const navigate = useNavigate()
    const {setActiveUser, loguedUser} = useStoreUser()

    const formattedDate = new Date(comment.createdAt).toLocaleString('es-AR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})

    const handleClickUserComment = async () => {
        await setActiveUser(comment.userId)
        navigate(`/profile/${comment.userId}`)
    }

    const handleDeleteComment = async () => {
        try{
            await deleteUserComment(comment.id)
            swalSucces("Comentario borrado")

            // 🔥 Actualizamos el estado sin recargar la página
			setComments(comments.filter((c) => c.id !== comment.id))
        }catch (err){
            swalError("Error al Borrar comentario", "No se pudo borrar el comentario")
        }

    }
  return (
    
    <>
        <div className={styles.commentContainer}>
            <div className={styles.perfilSide}>
                <img src={comment.linkProfileImg ?? "/account_circle.svg"} alt="fotoDePerfil" />
                <p className={styles.perfilUsername} onClick={handleClickUserComment}>{comment.username}</p>
            </div>
            <div className={styles.contentSide}>
                <span className={styles.dateComment}>Comentado el: {formattedDate}</span>
                <p>{comment.content}</p>
            </div>
            {loguedUser && loguedUser.id == comment.userId
            && (
                <button className={styles.deleteButton} onClick={handleDeleteComment}>Borrar</button>
            )}
        </div>
    </>
  )
}
