import { useState, useEffect} from 'react';
import './App.css';
import { Text,Flex, Button, List, ListItem, Center, Input, useDisclosure,Icon ,Image } from '@chakra-ui/react'
import {FcQuestions} from 'react-icons/fc'
import { nanoid } from 'nanoid';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react'

function App() {
  const [showAgregar, setShowAgregar] = useState(false);
  const [regaloObject, setRegaloObject] = useState({
    regalo:'',
    destinario:'',
    cantidad:'',
    imagen:'',
  });
  const [regaloObjectEDIT, setRegaloObjectEDIT] = useState(null);
  const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isAddOpen , onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
  const [listaRegalos, setListaRegalos] =  useState(()=>JSON.parse(localStorage.getItem('LSlistaRegalos'))||[]);
  useEffect(()=>{
    localStorage.setItem('LSlistaRegalos',JSON.stringify(listaRegalos))
  },[listaRegalos])
  function editRegalo(event){
    setRegaloObjectEDIT(()=>{
    const item = listaRegalos.filter(item => item.id === event.target.name)
    return item[0]})
    onEditOpen();
  }
  function addRegalo(){
    const item = {
      ...regaloObject,
      id: nanoid()
    }
    if(item.regalo === ''){
    } else {
      setListaRegalos(prevData=>[...prevData,item])
    }
    setRegaloObject({
      regalo:'',
      destinario:'',
      cantidad:'',
      imagen:'',
    })
  };
  function addRegaloEDIT(){
    setListaRegalos(prevData=>{
      const newArray = prevData.map((item)=>{
        if(item.id === regaloObjectEDIT.id){
          return regaloObjectEDIT
        } else {
          return item
        }
      })
      return newArray
    })
  };
  function removeRegalo(event){
    const id = event.nativeEvent.path[2].id
    setListaRegalos(prevData=> prevData.filter(item => item.id !== id))
  };

  function handleRegaloObject(event){
    setRegaloObject(prevData => {
      return {...prevData,[event.target.name]:event.target.value}
    })
  }
  function handleRegaloObjectEDIT(event){
    setRegaloObjectEDIT(prevData => {
      return {...prevData,[event.target.name]:event.target.value}
    })
  }
  function ListaRegalosComponent(){
    const Lista = listaRegalos.map( item =>{
      return(
          <ListItem key={item.id} id={item.id} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
              <Flex gap={'8px'} flexDir={'row'}>
              {item.imagen ? <Icon boxSize={'48px'} as={FcQuestions}/>:<Image src={item.imagen} />}
                <Flex flexDir={'column'} justifyContent={'center'} lineHeight={'20px'}>
                  <Text fontSize={'1.4rem'}>
                    {item.regalo} {item.cantidad > 1 && `x${item.cantidad}` }
                  </Text>
                  <Text color={'GrayText'}>
                    {item.destinario}
                  </Text>
                  
                </Flex>
              </Flex>
              <Flex gap={'8px'}>
                <Button name={item.id} onClick={editRegalo}>E</Button>
                <Button onClick={removeRegalo}>X</Button>
              </Flex>
          </ListItem>
        )})
    return (
      <List spacing={'4px'}>
        {Lista.length === 0 ?  <Center><Text color={'GrayText'}>No hay regalos! Agrega algo!</Text></Center> : Lista }
      </List>
    )
    }    

  return (
    <Flex flexDirection="column"   alignItems={'center'}>
        <Flex bgColor={'white'} w={['90vw','450px']}  h={['99vh','auto']}flexDir={'column'} gap={'12px'} p={5} pointerEvents={!showAgregar ? 'all': 'none'}>
          <Text fontSize='3rem' fontFamily={'Mountains of Christmas'} fontWeight={700}>Regalos:</Text>
          <Button onClick={onAddOpen} colorScheme='blue'>Agregar</Button>
          <ListaRegalosComponent/>
          <Button onClick={()=>setListaRegalos([])} marginTop={'auto'}>Borrar Lista</Button>
        </Flex>
      <Modal  isOpen={isAddOpen} onClose={onAddClose} >
        <ModalOverlay  />
        <ModalContent  w={['90vw','250px']}>
          <ModalHeader>Agregar Regalo🎁</ModalHeader>
          <ModalBody>
            <Flex flexDir={'column'} gap={'8px'}>
                <Input  placeholder='Regalo...'  autoComplete='off' type={'text'} name={'regalo'}  onChange={handleRegaloObject}/>
                <Input  placeholder='Destinario...'  autoComplete='off' type={'text'} name={'destinario'}  onChange={handleRegaloObject}/>
                <Input  placeholder='Cantidad...'  autoComplete='off' type={'number'} name={'cantidad'}  onChange={handleRegaloObject}/>
                <Input  placeholder='http://imagen/...'  autoComplete='off' type={'url'} name={'imagen'}  onChange={handleRegaloObject}/>
              </Flex>
          </ModalBody>

          <ModalFooter display={'flex'} justifyContent={'space-between'}>
            <Button  mr={3} onClick={onAddClose}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={addRegalo}>Agregar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal  isOpen={isEditOpen} onClose={onEditClose} >
        <ModalOverlay/>
        <ModalContent  w={['90vw','250px']}>
          <ModalHeader>Editar Regalo🎁</ModalHeader>
          <ModalBody>
            <Flex flexDir={'column'} gap={'8px'}>
                <Input placeholder='Regalo...' value={regaloObjectEDIT?.regalo} onChange={handleRegaloObjectEDIT} autoComplete='off' type={'text'} name={'regalo'} />
                <Input placeholder='Destinario...' value={regaloObjectEDIT?.destinario} onChange={handleRegaloObjectEDIT} autoComplete='off' type={'text'} name={'destinario'} />
                <Input placeholder='Cantidad...' value={regaloObjectEDIT?.cantidad} onChange={handleRegaloObjectEDIT} autoComplete='off' type={'number'} name={'cantidad'} />
                <Input placeholder='http://imagen/...' value={regaloObjectEDIT?.imagen} onChange={handleRegaloObjectEDIT} autoComplete='off' type={'url'} name={'imagen'} />
              </Flex>
          </ModalBody>
          <ModalFooter display={'flex'} justifyContent={'space-between'} >
            <Button  mr={3} onClick={onEditClose}>
              Close
            </Button>
            <Button colorScheme='whatsapp' onClick={addRegaloEDIT}>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
export default App;
