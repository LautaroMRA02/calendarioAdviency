import './App.css';
import {React, useState} from 'react'
// import { Grid, GridItem } from '@chakra-ui/react'

import { Box,Text,Flex,FormControl,Input,Button,List,ListItem, Center } from '@chakra-ui/react'
import {nanoid} from 'nanoid'
function App() {
  const [listRegalos, setlistRegalos] = useState([])
  const [regaloItem, setRegaloItem] = useState('')
  const listachilds = listRegalos.map((item)=><ListItem key={item.id} id={item.id}display={'flex'} justifyContent={'space-between'} alignItems={'center'}><Text>{item.regalo}</Text> <Button size='sm' onClick={(e)=>deleteRegalo(e)} colorScheme={'red'}>X</Button></ListItem>)

  function agregarRegalo(){
    const item = {id: nanoid(),regalo: `${regaloItem}`}
    setlistRegalos(prevListRegalos => [...prevListRegalos,item])
    setRegaloItem('')
    console.log(listRegalos)

  }
  function deleteRegalo(e){
    const newLista = [];
    console.log('sdasd')
    const id = e.nativeEvent.path[1].id
    console.log(id)

    setlistRegalos(prevlistRegalos => {
    for(let i = 0; i < prevlistRegalos.length;i++){ if(prevlistRegalos[i].id !== id){ newLista.push(prevlistRegalos[i])};}
    return newLista
  })
  }
  const ListRegalosComponent = () =>{
    return (
      <List pt={4} pb={4}>
        {listachilds.length > 0 ?  listachilds:  <Center><Text>no hay regalos</Text></Center>}
      </List>
    )
  }

  return (
    <Flex flexDirection="column" >
        <Box backgroundColor={'white'} p={5}borderRadius={10}>
        <Text fontSize='3rem' fontFamily={'Mountains of Christmas'} fontWeight={700}>Regalos:</Text>
        <FormControl pt={4} display={'flex'} flexWrap={['wrap','nowrap']} gap={'8px'}>
          <Input onChange={(e)=>setRegaloItem(() => e.target.value)} type='text' name='regalo' id='regalo' value={regaloItem} autoCapitalize='on' autoComplete='off'/>
          <Button onClick={()=>agregarRegalo()}  colorScheme={'blue'} w={['100%','30%','30%','30%']}  type='submit'>agregar</Button>
        </FormControl>
        <ListRegalosComponent />
        <Button onClick={()=>setlistRegalos(prev => [])} w={'100%'} colorScheme={'red'}>Vaciar lista</Button>
        </Box>
    </Flex>
  );
}

export default App;
