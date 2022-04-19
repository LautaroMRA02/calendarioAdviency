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
    Flex,
  } from '@chakra-ui/react'
import { nanoid } from 'nanoid'

function AddModal({ regaloObject,setRegaloObject,setListaRegalos,isOpenAdd,onCloseAdd }) {

    function handleRegaloApp(e){
        setRegaloObject(prevData=>{
            return {...prevData, [e.target.name]:e.target.value}
        })
    }
    function AddRegalo(){
        setListaRegalos(prevData=>{
            const item = 
            {   
                ...regaloObject,
                id: nanoid()
            }
            return[...prevData,item]
        })
        setRegaloObject({
            regalo: '',
            precio: '',
            destinario: '',
            cantidad: '',
            imagen: ''
        })
    }
    const regalosAleatorios = [
        "Kit de uñas",
        "Gorrito",
        "Guantes",
        "Leggings",
        "Calentadores",
        "Bufanda",
        "Perfume",
        "Maletín con juego de llaves",
        "Atornillador",
        "Sacacorchos",
        "Tirador de cerveza",
        "Juego cubos de hielo",
        "Recortador de barba",
        "Kit cuidado para barba",
      ];
      function regaloRandom(){
        const num  = Math.floor(Math.random() * (14 - 1)) + 1;
        document.getElementById('regalo').value = regalosAleatorios[num]
        setRegaloObject((prevData) => {
          return { ...prevData, regalo: regalosAleatorios[num] };
        });
      }
  return (
    <>
    <Modal isOpen={isOpenAdd} onClose={onCloseAdd}>
        <ModalOverlay/>
        <ModalContent>
        <ModalHeader>Agregar Regalo</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form">
            <FormLabel htmlFor='regalo'>Regalo</FormLabel>
            <Flex gap={'8px'}>
                <Input onChange={handleRegaloApp}  name='regalo' id='regalo' autoComplete='off'/>
                <Button onClick={regaloRandom}>Aleatorio</Button>
            </Flex>
            <FormLabel htmlFor='regalo'>Precio</FormLabel>
            <Input type='number'  
            defaultValue={'$'} onChange={handleRegaloApp} name='precio' id='precio' autoComplete='off'/>
            <FormLabel htmlFor='destinario'>Destinario</FormLabel>
            <Input onChange={handleRegaloApp} name='destinario' id='destinario' autoComplete='off'/>
            <FormLabel htmlFor='cantidad'>Cantidad</FormLabel>
            <Input onChange={handleRegaloApp} name='cantidad' id='cantidad' autoComplete='off'/>
            <FormLabel htmlFor='imagen'>Imagen(url)</FormLabel>
            <Input onChange={handleRegaloApp} name='imagen' id='imagen' autoComplete='off'/>
        </ModalBody>
        <ModalFooter>
            <Button marginRight={'auto'}onClick={onCloseAdd}>Cerrar</Button>
            <Button colorScheme='blue'  onClick={AddRegalo}>Agregar</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
    </>
  )
}

export default AddModal