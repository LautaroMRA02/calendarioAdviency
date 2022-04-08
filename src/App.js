import './App.css';
import { Flex, Spinner , useDisclosure, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { api } from './helpers/api';
import ListaComponent from './components/ListaComponent';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';


function App() {
  const [listaRegalos, setListaRegalos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { isOpen:isOpenAdd, onOpen:onOpenAdd, onClose:onCloseAdd } = useDisclosure()
  const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure()

  useEffect(() => {
    api.regaloPedir()
        .then(gifts => setListaRegalos(gifts.data))
        .catch(console.log).finally(() => setIsLoading(false))
  }, [])
  useEffect(()=>{
    api.regaloGuardar(listaRegalos)
  },[listaRegalos])
  const [EditRegaloObject, setEditRegaloObject] = useState({})


  function ObjectEdit(e){
    const id = e.target.name
    setEditRegaloObject(() => {
      const item =  listaRegalos.filter(item => item.id === id)
      return item[0]
    })
    console.log(EditRegaloObject)
    onOpenEdit()
  }

  return (
    <Flex flexDirection="column" >
        <Flex bg={'white'} flexDir={'column'} p={5} gap={'8px'} w={['98vw','400px']}>
          {
            isLoading ? <Spinner color='blue.500' />: <ListaComponent  ObjectEdit={ObjectEdit} onOpenEdit={onOpenEdit} onOpenAdd={onOpenAdd} listaRegalos={listaRegalos} setListaRegalos={setListaRegalos} />
          }
        </Flex>
        <AddModal  setListaRegalos={setListaRegalos} isOpenAdd={isOpenAdd} onOpenAdd={onOpenAdd}  onCloseAdd={onCloseAdd}/>
        <EditModal setListaRegalos={setListaRegalos} EditRegaloObject={EditRegaloObject}  setEditRegaloObject={setEditRegaloObject} isOpenEdit={isOpenEdit} onOpenEdit={onOpenEdit} onCloseEdit={onCloseEdit}/>
    </Flex>
  );
}

export default App;
