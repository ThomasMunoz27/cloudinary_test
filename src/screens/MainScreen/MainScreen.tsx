import { useStoreModal } from '../../store/useStoreModal'
import { Header } from '../../ui/Header/Header'
import { ModalAddFile } from '../../ui/modals/ModalAddFile'

export const MainScreen = () => {

    const {modalAddFile} = useStoreModal()

  return (
    <>
        <Header></Header>


        {/* aqui va a ir un mapeo de las imagenes de cloudinary <imageCard/> */}
        {modalAddFile && <ModalAddFile></ModalAddFile>}
    </>
)
}
