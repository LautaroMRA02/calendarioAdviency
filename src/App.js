import './App.css';
import { Text,Flex, Button, useDisclosure, Spinner } from '@chakra-ui/react'
import {api} from './helpers/api'
import { useEffect, useState } from 'react';
import ListaComponent from './components/ListaComponent';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
function App() {
  // React hooks
  const [regaloState, setRegaloState] = useState({
    regalo:'',
    destinario:'',
    cantidad:'',
    imagen:''
  })
  const [ListaRegalos, setListaRegalos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {    
    api.pedirRegalos().then(gifts => setListaRegalos(gifts.data))
    .catch(console.log).finally(() => setIsLoading(false))
  }, [])
  useEffect(()=>{
    api.guardarRegalos(ListaRegalos)
  },[ListaRegalos])

  // Chakra hooks
  const {isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd }=useDisclosure()
  const {isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit }=useDisclosure()
  
  function limpiarAdd(){
    setRegaloState({
      regalo:'',
      destinario:'',
      cantidad:'',
      imagen:''
    })
    onOpenAdd()
  }
  if(isLoading){
    return (
      <Flex flexDirection="column" bgColor={'white'} width={'auto'} p={5} gap={'8px'}>
        <Spinner color='blue.500'/>
      </Flex>
    )
  } else {
  return (
    <Flex flexDirection="column" bgColor={'white'} width={['90vw','400px']} p={5} gap={'8px'}>
        <Text fontSize={'3rem'} fontFamily={'Mountains of Christmas'} fontWeight={700}>Regalos:</Text>
        <Button onClick={limpiarAdd} colorScheme={'blue'}>Agregar</Button>
        <ListaComponent  setListaRegalos={setListaRegalos} setRegaloState={setRegaloState} ListaRegalos={ListaRegalos} onOpenEdit={onOpenEdit}/>
        <Button onClick={()=>setListaRegalos([])}>Borrar Lista</Button>
        <AddModal regaloState={regaloState} setRegaloState={setRegaloState} ListaRegalos={ListaRegalos} setListaRegalos={setListaRegalos} isOpenAdd={isOpenAdd} onCloseAdd={onCloseAdd}/>
        <EditModal regaloState={regaloState} setRegaloState={setRegaloState} setListaRegalos={setListaRegalos} isOpenEdit={isOpenEdit}  onCloseEdit={onCloseEdit}/>
    </Flex>
  );}
}

export default App;
