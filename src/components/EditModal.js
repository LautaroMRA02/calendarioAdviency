import React from 'react'
import {
    FormLabel, Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'
  
function EditModal({regaloObject,isOpenEdit,onCloseEdit }) {
  return (
    <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay/>
        <ModalContent>
        <ModalHeader>Editar Regalo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <FormLabel htmlFor='regalo'>Regalo</FormLabel>
            <Input  defaultValue={regaloObject?.regalo} name='regalo' id='regalo' autoComplete='off'/>
            <FormLabel htmlFor='regalo'>Precio</FormLabel>
            <Input  defaultValue={regaloObject?.precio} name='precio' id='precio' autoComplete='off'/>
            <FormLabel htmlFor='destinario'>Destinario</FormLabel>
            <Input  defaultValue={regaloObject?.destinario} name='destinario' id='destinario' autoComplete='off'/>
            <FormLabel htmlFor='cantidad'>Cantidad</FormLabel>
            <Input  defaultValue={regaloObject?.cantidad} name='cantidad' id='cantidad' autoComplete='off'/>
            <FormLabel htmlFor='imagen'>Imagen(url)</FormLabel>
            <Input  defaultValue={regaloObject?.imagen} name='imagen' id='imagen' autoComplete='off'/>
        </ModalBody>
        <ModalFooter>
            <Button marginRight={'auto'}  onClick={onCloseEdit}>Cerrar</Button>
            <Button colorScheme='whatsapp'>Guardar</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default EditModal