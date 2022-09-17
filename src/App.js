import './App.css';
import { Text,Flex, Stack, Button, Spinner, Modal, useDisclosure, ModalContent, Input, FormLabel, Image, Icon } from '@chakra-ui/react'
import { useEffect, useReducer, useState } from 'react';
import HANDLER_REGALOS from './services/localstore';
import { INITIAL_STATE, regalosReducer } from './AppReducer';
import {FcAnswers} from 'react-icons/fc'

import EditModal from './components/EditModal';


function App() {
  const [state, dispatch] = useReducer(regalosReducer, INITIAL_STATE)


  const [regaloForm,setRegaloForm] = useState({
    regalo: null,
    cantidad: 1,
    valor: 0,
    para: null,
    imagen: null
  })
  const [SELECTED_REGALO,setSELECTED_REGALO] = useState(null)
  const { isOpen:isOpenAdd, onOpen:onOpenAdd, onClose:onCloseAdd } = useDisclosure()
  const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure()
  
  useEffect(()=>{
    dispatch({type:'START'})
    HANDLER_REGALOS.get().then(res=>{
      dispatch({type:'SUCCESS',payload:{value:  res.response}})
    })
  },[])

  useEffect(()=>{
      HANDLER_REGALOS.set(state.regalos);
  },[state])

  function SELECT_ITEM(e){
    const item = state.regalos.filter(item => item.id === e.target.name)
    setSELECTED_REGALO(item[0])
    onOpenEdit()
  }

  function REGALO_ONCHANGE_ADD(e){
    setRegaloForm(prevData=>{
      return {...prevData, [e.target.name]: e.target.value}
    })
  }

  function REGALO_ONCHANGE_EDIT(e){
    setSELECTED_REGALO(prevData=>{
      return {...prevData, [e.target.name]: e.target.value}
    })
  }
  function ADD_REGALO(){
    dispatch({type:"ADD_REGALO", payload: { value: regaloForm }});
    setRegaloForm({regalo: null,cantidad: 1,valor: 0,para: null,imagen: null})
    onCloseAdd();
  }

  function EDIT_REGALO(){
    dispatch({type:"EDIT_REGALO", payload: { value: SELECTED_REGALO }});
    onCloseEdit();
  }
  
  function GET_VALOR_TOTAL(){
    const valores = state.regalos.map(item=>{
      if(Number.isInteger(Number(item.valor))){
        return item.valor
      } else {
        return 0
      }
    })
    const valor = valores.reduce( (acc,vac)=> Number(acc) + Number(vac))
    console.log(valor)
    return valor
  }









  if(state.loading ){
    return (
      <Flex flexDirection="column" bgColor={'white'} width={'auto'} p={5} gap={'8px'}>
      <Spinner color='blue.500' boxSize='100px'/>
      <h2>cargando ...</h2>
    </Flex>
    )
  }
  return (
    <Flex flexDirection="column" w='500px' p={3} gap={3} bgColor={'white'} rounded={4}>
        <Stack  direction='row' p={1}>
          <Text fontSize='2rem'>Regalos:</Text>
          <Button>test</Button>
        </Stack>
        <Button onClick={()=>onOpenAdd()}  bgColor='blue.500' color='white'>Agregar</Button>
        <Stack w={'full'}>
          { state.regalos.length >= 1 ? state.regalos.map((item=>{
            return (
              <Stack key={item.id} direction='row' position='relative' alignItems={'center'}>
                {item.imagen ? <Image src={item.imagen} alt={item.regalo + ' imagen'} boxSize='48px'/>: <Icon as={FcAnswers} boxSize='48px'/> }
                <Stack direction='column'>
                  <Stack direction='row'>
                    <Text>{item.regalo} ({item.cantidad}) -</Text>
                    <Text> $ {item.valor}</Text>
                  </Stack>
                  <Text color={'GrayText'} lineHeight={'10px'} >{item.para}</Text>
                </Stack>
                <Stack marginLeft='auto !important' direction='row'>
                  <Button onClick={(e)=>SELECT_ITEM(e)} name={item.id}  bgColor={'whatsapp.300'}>E</Button>
                  <Button onClick={ (e)=>dispatch({type:'DELETE_REGALO', payload:{id: e.target.name}}) } name={item.id} bgColor={'red.300'} >X</Button>
                </Stack>
              </Stack>
            )
          })) :<Text textAlign={'center'}>no hay regalos</Text>  }
          {
            state.regalos.length >= 1 && (
              <Stack>
                  <Stack h={'2px'} w={'full'} bgColor="GrayText" ></Stack>
                  <Text textAlign={'center'}>Total: ${ GET_VALOR_TOTAL()}</Text>
              </Stack>
            )
          }
        </Stack>
        <Button onClick={()=>dispatch({type:'REMOVE_ALL'})}>Borrar Lista</Button>
        <Modal isCentered isOpen={isOpenAdd} onClose={onCloseAdd}>
          <ModalContent p={3}>
            <Stack direction={'column'}>
              <Stack direction={'row'} justifyContent='space-between'>
                <h1>Agregar</h1>
                <Button onClick={()=>onCloseAdd()} bgColor='red.500'>X</Button>
              </Stack>
              <form onChange={(e)=>REGALO_ONCHANGE_ADD(e)}>
                <FormLabel htmlFor='regalo'>Regalo:</FormLabel>
                <Input id="regalo" name="regalo" type='text'  alt='input regalo'/>

                <FormLabel htmlFor='cantidad'>Cantidad:</FormLabel>
                <Input id='cantidad' name='cantidad' type='number' alt='input cantidad'/>

                <FormLabel htmlFor='valor'>Valor:</FormLabel>
                <Input id='valor' name='valor' type='number' alt='input valor'/>

                <FormLabel htmlFor='para'>Para:</FormLabel>
                <Input id='para' name='para' type='text' alt='input para'/>

                <FormLabel htmlFor='imagen'>Imagen(url):</FormLabel>
                <Input id='imagen' name='imagen' type='url' alt='input imagen url'/>
              </form>
              <Button onClick={()=>ADD_REGALO()} bgColor='blue.500'>Agregar</Button>
            </Stack>
          </ModalContent>
        </Modal> 
        <EditModal isOpenEdit={isOpenEdit} onCloseEdit={onCloseEdit} SELECTED_REGALO={SELECTED_REGALO} REGALO_ONCHANGE_EDIT={REGALO_ONCHANGE_EDIT} EDIT_REGALO={EDIT_REGALO}/>

    </Flex>
  );
}


export default App;
