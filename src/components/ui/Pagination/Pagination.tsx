import { useEffect, useState } from 'react'
import { useStoreImages } from '../../../store/useStoreImages'
import styles from './Pagination.module.css'
import { useStoreListCategories } from '../../../store/useStoreListCategories'

export const Pagination = () => {

    const {images, fetchImagesStore} = useStoreImages()
    const {activeCategory} = useStoreListCategories()

    const [actualPage, setActualPage] = useState(0)

    //cuando haya filtrado por categoria aca va una copnstante para eso
    //const actualCategory = unaStore()


    const getPagedImages = async () => {
        await fetchImagesStore(actualPage, 2, activeCategory?.id)
    }

    useEffect(()=> {
        getPagedImages()
    }, [actualPage])
  return (
    <>
        <div className={styles.pagination}>
            <button disabled={actualPage===0} className={styles.paginationButton} onClick={()=> setActualPage(actualPage - 1)}><img src="/chevron_left.svg" alt="" /></button>

            {Array.from({length: images.totalPages}, (_,i) => i)
                .filter((page) =>
                    page === 0 ||
                    page === images.totalPages - 1 ||
                    Math.abs(page - actualPage) <= 2
                )
                .reduce((acc: (number | string)[], page, index, array)=>{
                    if(index > 0 && page - (array[index - 1] as number) > 1 ){
                        acc.push("...")
                    }
                    acc.push(page)

                    return acc
                },[])
                .map((page, i) =>
                    page === "..." ? (
                        <span key={i} className={styles.paginationEllipsis}>...</span>
                    ) :
                    (
                        <button className={`${styles.paginationButton} ${actualPage === i ? styles.active : ""}`} key={i} onClick={() => setActualPage((page as number))}>
                            {(page as number) + 1}
                        </button>
                    )
                )
            }
            
            <button disabled={actualPage+1===images.totalPages} className={styles.paginationButton} onClick={()=> setActualPage(actualPage + 1)}><img src="/chevron_right.svg" alt="" />
            </button>
        </div>
    </>
  )
}
