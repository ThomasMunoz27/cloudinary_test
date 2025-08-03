import { useEffect, useState } from 'react'
import { useStoreImages } from '../../../store/useStoreImages'
import styles from './Pagination.module.css'

export const Pagination = () => {

    const {images, fetchImagesStore} = useStoreImages()

    const [actualPage, setActualPage] = useState(0)

    //cuando haya filtrado por categoria aca va una copnstante para eso
    //const actualCategory = unaStore()


    const getPagedImages = async () => {
        await fetchImagesStore(actualPage, 2)
    }

    useEffect(()=> {
        getPagedImages()
    }, [actualPage])
  return (
    <>
        <div className={styles.pagination}>
            <button disabled={actualPage===0} className={styles.paginationButton} onClick={()=> setActualPage(actualPage - 1)}><img src="/chevron_left.svg" alt="" /></button>
            {Array.from({length: images.totalPages}, (_,i) => (
                <button className={`${styles.paginationButton} ${actualPage === i ? styles.active : ""}`} key={i} onClick={() => setActualPage(i)}>
                    {i + 1}
                </button>
            ))}
            <button disabled={actualPage+1===images.totalPages} className={styles.paginationButton} onClick={()=> setActualPage(actualPage + 1)}><img src="/chevron_right.svg" alt="" /></button>
        </div>
    </>
  )
}
