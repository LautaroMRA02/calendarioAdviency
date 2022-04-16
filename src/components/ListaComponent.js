import { Button, Center, Flex, List, ListItem, Text,Icon,Image } from '@chakra-ui/react'
import React from 'react'
import { FcAnswers } from "react-icons/fc";


function ListaComponent({setListaRegalos,setRegaloState, ListaRegalos,onOpenEdit}) {

 
  function isUrl(s) {   
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}
  function deleteRegalo(e){
    setListaRegalos(prevData=> prevData.filter(item => item.id !== e.target.name))
  }
  function openModalEdit(e){
    setRegaloState(prevData=>{
     const item =  ListaRegalos.filter(item => item.id === e.target.name) 
     return item[0]
    })
    onOpenEdit();
  }
  const componentTernari = ListaRegalos.length  >= 1  ? (
    <List spacing={'4px'}>
      { ListaRegalos.map(item=>(
        <ListItem key={item.id} id={item.id} display={'flex'} flexDir={'row'} alignItems={'center'} justifyContent='space-between'>
        <Flex alignItems={'center'}>
          {isUrl(item.imagen) ? <Image src={item.imagen} boxSize={'48px'}/> : <Icon as={FcAnswers}boxSize={'48px'}/> }
          <Flex flexDir={'column'}  >
            <Text lineHeight={'16px'}>{item.regalo} {item.cantidad > 1 && `x${item.cantidad}`}</Text>
            <Text color={'GrayText'} lineHeight={'10px'}>{item.destinario}</Text>
          </Flex>
        </Flex>
          <Flex gap={'8px'}>
            <Button size={'sm'} name={item.id} onClick={openModalEdit}>E</Button>
            <Button size={'sm'} name={item.id} onClick={(e)=>deleteRegalo(e)}>X</Button>
          </Flex>
        </ListItem>
      ))}
    </List>
  ) 
  : 
  (
    <Center><Text color={'GrayText'}>No hay regalos! Agrega algo!</Text></Center>
  );

  return componentTernari
}

export default ListaComponent