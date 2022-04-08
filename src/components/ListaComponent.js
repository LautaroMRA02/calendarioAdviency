import { Button, Center, Flex, List, ListItem, Text,Icon,Image } from '@chakra-ui/react'
import React from 'react'
import { FcAnswers } from "react-icons/fc";
function ListaComponent({ObjectEdit , listaRegalos,setListaRegalos,onOpenAdd,setEditRegalo}){
    function removeRegalo(e){
        const id = e.target.name
        setListaRegalos(prevData=> prevData.filter(item=> item.id !== id))
    }   
   
    
    function ListaSubComponent({listaRegalos}){
        return(
            <List>
                {listaRegalos.map((item)=>(
                    <ListItem key={item.id} id={item.id} display={'flex'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        
                        <Flex>
                        {item.imagen ? <Image src={item.imagen} boxSize={'48px'} alt={item.regalo}/>: <Icon as={FcAnswers} boxSize={'48px'}/>}
                         <Flex flexDir={'column'} lineHeight={'20px'} > 
                            <Text>{item.regalo} x{item.cantidad}</Text>
                            <Text>{item.destinario}</Text>
                         </Flex>   
                        
                        </Flex>
                        <Flex gap="8px">
                            <Button size={'sm'} name={item.id} alt={'boton de editar'} onClick={ObjectEdit}>E</Button>
                            <Button size={'sm'} name={item.id} alt={'boton de eliminar'} onClick={(e)=>removeRegalo(e)}>X</Button>
                        </Flex>
                    </ListItem>
                ))}
            </List>
        )
    }


    return(
      <React.Fragment>
          <Text fontSize='3rem' fontFamily={'Mountains of Christmas'} fontWeight={700}>Regalos:</Text>
          <Button colorScheme={'blue'} onClick={onOpenAdd}>Agregar</Button>
          {listaRegalos.length < 1 ? <Center><Text>No hay regalos! Agrega uno!</Text></Center>: <ListaSubComponent  listaRegalos={listaRegalos} setListaRegalos={setListaRegalos} /> }
          <Button onClick={()=>setListaRegalos([])}>Borrar Lista</Button>
      </React.Fragment>
    )
  }

export default ListaComponent