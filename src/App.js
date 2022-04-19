import './App.css';
import { Text,Flex, Button, useDisclosure, Center, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import ListComponent from './components/ListComponent';
import {api} from './helpers/api'

function App() {
  // REACT HOOK
  const [regaloObject, setRegaloObject] = useState({
    regalo: '',
    precio: '',
    destinario: '',
    cantidad: '',
    imagen: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [ListaRegalos, setListaRegalos] = useState([])
  useEffect(() => {
    api.PedirRegalos().then(regalos=> setListaRegalos(regalos.data)).catch(console.log).finally(() => setIsLoading(false))
    }
  ,[])
  useEffect(()=>{
    api.GuardarRegalos(ListaRegalos)
  },[ListaRegalos])

  // CHAKRA HOOK
 const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure()
 const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()

 function editRegalo(e){
  setRegaloObject(prevData=>{
    const item = ListaRegalos.filter(item=>item.id === e.target.name)
    return item[0]
  })
  onOpenEdit()
 }

 if(isLoading){
  return (
    <Flex flexDirection="column" bgColor={'white'} width={'auto'} p={5} gap={'8px'}>
      <Spinner color='blue.500'/>
    </Flex>
  )
 }else{
  return (
    <Flex flexDirection="column" w={['90vw','400px']} bgColor={'white'} gap={'12px'}  p={5} borderRadius={5} h={['98vh','auto']}>
        <Text fontSize='3rem' fontFamily={'Mountains of Christmas'} fontWeight={700}>Regalos:</Text>
        <Button colorScheme={'blue'} onClick={onOpenAdd}>Agregar</Button>
        {ListaRegalos.length === 0 ? <Center><Text color={'GrayText'}>No hay regalos! Agrega algo!</Text></Center>: <ListComponent regaloObject={regaloObject} ListaRegalos={ListaRegalos} setListaRegalos={setListaRegalos} editRegalo={editRegalo}/>}
        <Button onClick={()=>setListaRegalos([])} marginTop={'auto'}>Borrar Lista</Button>
        <AddModal regaloObject={regaloObject} setRegaloObject={setRegaloObject} setListaRegalos={setListaRegalos} isOpenAdd={isOpenAdd}  onCloseAdd={onCloseAdd}/>
        <EditModal regaloObject={regaloObject} isOpenEdit={isOpenEdit} onCloseEdit={onCloseEdit}/>
    </Flex>
  );
}
}

export default App;
