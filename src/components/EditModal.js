import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Flex,
  } from '@chakra-ui/react'

function EditModal({setListaRegalos, EditRegaloObject,setEditRegaloObject, isOpenEdit, onOpenEdit, onCloseEdit }) {
    function handleRegaloObject(e){
        setEditRegaloObject(prevData=>{
            return{...prevData,[e.target.name]:e.target.value}}
            )
    }
    function regaloGuardar(){
            setListaRegalos(prevData => {
                const newArray = prevData.map((item)=>{
                    if(item.id === EditRegaloObject.id){
                        return EditRegaloObject
                    } else {
                        return item
                    }
                })
                return newArray
            } )
    }
   console.log(EditRegaloObject)
  return (
      <React.Fragment>
        <Modal isOpen={isOpenEdit} onClose={onCloseEdit} >
        <ModalOverlay />
        <ModalContent w={['98vw','400px']}>
        <ModalHeader>Editar Regalo </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <FormControl id='formadd'>
                <FormLabel htmlFor='regalo'>Regalos</FormLabel>
                <Input autoComplete='off' 
                type='text' 
                name='regalo' 
                value={EditRegaloObject?.regalo} 
                onChange={handleRegaloObject} />

                <FormLabel htmlFor='regalo'>Destinario</FormLabel>
                <Input autoComplete='off' 
                 value={EditRegaloObject?.destinario}
                 type='text' 
                 id='destinario' 
                 name='destinario' 
                 onChange={handleRegaloObject}
                 />

                <FormLabel htmlFor='regalo'>Cantidad</FormLabel>
                <Input autoComplete='off' 
                defaultValue={'1'} 
                value={EditRegaloObject?.cantidad} 
                type='number' 
                id='cantidad' 
                name='cantidad' 
                onChange={handleRegaloObject}
                />

                <FormLabel htmlFor='regalo'>Imagen</FormLabel>
                <Input autoComplete='off' 
                value={EditRegaloObject?.imagen} 
                type='text' 
                id='imagen' 
                name='imagen' 
                onChange={handleRegaloObject}
                />
                <Flex marginTop={'16px'}  justifyContent={'space-between'}  > 
                    <Button mr={3} onClick={onCloseEdit}>
                        Cancelar
                    </Button>
                    <Button type='submit' colorScheme='whatsapp' onClick={regaloGuardar} >
                        Guardar
                    </Button>
            </Flex>
            </FormControl>
        </ModalBody>
    
       
        </ModalContent>
    </Modal>
  </React.Fragment>
  )
}

export default EditModal