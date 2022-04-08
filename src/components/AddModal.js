import React, { useState } from 'react'
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
import { nanoid } from 'nanoid'

function AddModal({setListaRegalos,  isOpenAdd, onOpenAdd, onCloseAdd }) {
    const [regaloObject, setRegaloObject] = useState({
        regalo:'', 
        destinario:'',
        cantidad: 1,
        imagen:''
      })
    function handleRegaloObject(e){
        setRegaloObject(prevData=>{
            return{...prevData,[e.target.name]:e.target.value}}
            )
    }
    function addRegalo(e){
        const item ={ ...regaloObject, id:nanoid() }    
        setListaRegalos(prevData=> [...prevData,item])
        setRegaloObject({
            regalo:'', 
            destinario:'',
            cantidad: 1,
            imagen:''
          })
    };
  return (
      <React.Fragment>
        <Modal isOpen={isOpenAdd} onClose={onCloseAdd} >
        <ModalOverlay />
        <ModalContent w={['98vw','400px']}>
        <ModalHeader>Agregar Regalo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <FormControl id='formadd'>
                <FormLabel htmlFor='regalo'>Regalos</FormLabel>
                <Input autoComplete='off' isRequired type='text' id='regalo' name='regalo' onChange={handleRegaloObject}/>
                <FormLabel htmlFor='regalo'>Destinario</FormLabel>
                <Input autoComplete='off' isRequired type='text' id='destinario' name='destinario' onChange={handleRegaloObject}/>
                <FormLabel htmlFor='regalo'>Cantidad</FormLabel>
                <Input autoComplete='off' defaultValue={'1'} isRequired type='number' id='cantidad' name='cantidad' onChange={handleRegaloObject}/>
                <FormLabel htmlFor='regalo'>Imagen</FormLabel>
                <Input autoComplete='off' isRequired type='text' id='regalo' name='regalo' onChange={handleRegaloObject}/>
                <Flex marginTop={'16px'}  justifyContent={'space-between'}  > 
                    <Button mr={3} onClick={onCloseAdd}>
                        Cancelar
                    </Button>
                    <Button type='submit' colorScheme='blue' onClick={addRegalo}>
                        agregar
                    </Button>
            </Flex>
            </FormControl>
        </ModalBody>
    
       
        </ModalContent>
    </Modal>
  </React.Fragment>
  )
}

export default AddModal