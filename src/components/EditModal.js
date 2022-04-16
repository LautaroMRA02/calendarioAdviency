import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Button,
    Text,
    ModalHeader,
    ModalBody,
    Input,
    FormLabel,
    Flex
  } from '@chakra-ui/react'

function EditModal({regaloState,setRegaloState,setListaRegalos,isOpenEdit,onCloseEdit}) {
    function handleRegalo(e){
        setRegaloState(prevData=>{
         return {...prevData,[e.target.name]: e.target.value}
       }) 
      }
    function editRegalo(){
        setListaRegalos(prevData => prevData.map(item=>{
            if(item.id === regaloState.id){
                return regaloState
            } else {
                return item 
            }
        }))
        setRegaloState({
            regalo:'',
            destinario:'',
            cantidad:'',
            imagen:''
          })
    }
  return (
    <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
      <Text>Editar Regalo</Text>
      <ModalCloseButton />
      </ModalHeader>

      <ModalBody>
        <form>
          <FormLabel htmlFor='' as='legend'>Regalo</FormLabel> 
            <Input defaultValue={regaloState?.regalo} onChange={handleRegalo} variant={'filled'} autoComplete='off' type={'text'} name="regalo" alt='regalo' id='regaloEdit'/>
          <FormLabel htmlFor='destinario' as='legend'>Destinario</FormLabel> 
            <Input defaultValue={regaloState?.destinario} onChange={handleRegalo}  variant={'filled'} autoComplete='off' type={'text'} name="destinario" alt='destinario' id='destinarioEdit'/>
          <FormLabel htmlFor='cantidad' as='legend'>Cantidad</FormLabel> 
            <Input defaultValue={regaloState?.cantidad} onChange={handleRegalo} variant={'filled'} autoComplete='off' type={'number'}name="cantidad" alt='cantidad' id='cantidadEdit'/>
          <FormLabel htmlFor='imagen' as='legend'>Imagen(url)</FormLabel> 
            <Input defaultValue={regaloState?.imagen} onChange={handleRegalo}  variant={'filled'} autoComplete='off' type={'text'} name="imagen" alt='imagen' id='imagenEdit'/>
          <Flex mt={'16px'}>
            <Button  mr={'auto'} onClick={onCloseEdit}>Cerrar</Button>
            <Button colorScheme='whatsapp' onClick={editRegalo}>Guardar</Button>
          </Flex>
        </form>
      </ModalBody>


      
    </ModalContent>
  </Modal>
  )
}

export default EditModal