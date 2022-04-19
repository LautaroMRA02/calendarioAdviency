import React from 'react'
import {Button, Flex, List, ListItem, Text,Image, Icon} from '@chakra-ui/react'
import {FcAnswers} from 'react-icons/fc'
function ListComponent({regaloObject, ListaRegalos,setListaRegalos,editRegalo}) {
  function removeRegalo(e){
      setListaRegalos(prevData=>prevData.filter(item=> item.id !== e.target.name))
  }
  return (
      <List>
          {ListaRegalos.map(item =>(
              <ListItem key={item.id} display={'flex'} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Flex>
                    {item.imagen !== '' ? <Image src={item.imagen} boxSize={'48px'}/>:<Icon as={FcAnswers} boxSize={'48px'}/>}
                    <Flex marginLeft={'4px'} flexDir={'column'} lineHeight={'15px'} justifyContent={'center'}>
                        <Text>{item.regalo} {item.cantidad > 1 && `(${item.cantidad})`}  {item.precio&&`- $${item.precio}` }</Text>
                        <Text marginLeft={'5px'} color={'GrayText'} fontSize={'sm'}>{item.destinario}</Text>
                    </Flex>
                  </Flex>
                  <Flex gap={'4px'}>
                      <Button size={'sm'} name={item.id} onClick={editRegalo}>E</Button>
                      <Button size={'sm'} name={item.id} onClick={(e)=>removeRegalo(e)}>X</Button>
                  </Flex>
              </ListItem>
          ))}
      </List>
  )
}

export default ListComponent