import './App.css';
import {React, useState} from 'react'
// import { Grid, GridItem } from '@chakra-ui/react'

import { Box,Text,Flex,FormControl,Input,Button,List,ListItem, Center } from '@chakra-ui/react'
import {nanoid} from 'nanoid'
function App() {
  const [listRegalos, setlistRegalos] = useState([])
  const [regaloItem, setRegaloItem] = useState('second')
  const listachilds = listRegalos.map((item)=><ListItem key={nanoid()}>{item}</ListItem>)

  function agregarRegalo(){
alert('sadsa')
  }
  const ListRegalosComponent = () =>{
    return (
      <List>
        {listachilds ? <Center><Text>no hay regalos</Text></Center> : listachilds}
      </List>
    )
  }

  return (
    <Flex flexDirection="column" >
        <Box backgroundColor={'white'} p={10}>
        <Text fontSize='2rem'>Regalos:</Text>
        <FormControl onSubmit={agregarRegalo} display={'flex'} flexWrap={['wrap','nowrap']}>
          <Input type='text' name='regalo' id='regalo' autoCapitalize='on' autoComplete='off'/>
          <Button  colorScheme={'blue'} w={['100%','30%','30%','30%']}  type='submit'>agregar</Button>
        </FormControl>
        <ListRegalosComponent />
        <Button w={'100%'} colorScheme={'red'}>Vaciar lista</Button>
        </Box>
    </Flex>
  );
}

export default App;
