import React from 'react';
import './App.css';
import { nanoid } from 'nanoid';
// import { Grid, GridItem } from '@chakra-ui/react'
import { Box,Text,Flex ,List,ListItem,FormControl,Input,Button,Center} from '@chakra-ui/react'
function App() {
  const [regaloItem, setRegaloItem] = React.useState('')
  const [ListRegalo, setListRegalo] = React.useState([])
  function addRegalo(){
    let regalos = ListRegalo.map(item=>item.regalo)
    if(regalos.includes(regaloItem)){
      
    } else if( regaloItem === '') {

    } else {
      let item = {id:nanoid(),regalo: regaloItem}
      setListRegalo(prevData => [...prevData, item] )
      setRegaloItem('')
    }
  };
  function removeRegalo(e){
    let id = e.nativeEvent.path[1].id
    setListRegalo(prevData =>{
      let newData = []
      for(let i = 0; i < prevData.length; i++){
        if(prevData[i].id !== id){
          newData.push(prevData[i])
        }
      }
      return newData
    })
  };


  function ListaReglosComponent(){
    return(
      <List>
        {ListRegalo.length > 0 ? ListRegalo.map((item)=><ListItem key={item.id} id={item.id} display={'flex'} justifyContent={'space-between'} alignItems={'center'}><Text>{item.regalo}</Text><Button size='md' onClick={(e)=>removeRegalo(e)}>X</Button></ListItem>): <Center><Text>No hay regalos! Agregue algunos!</Text></Center>}
      </List>
    )
  }
  return (
    <Flex flexDirection="column" >
        <Box backgroundColor={'whiteAlpha.800'} p={5} borderRadius={10} display={'flex'} flexDirection={'column'} gap={'8px'}>
        <Text fontSize='3rem' fontFamily={['Mountains of Christmas']} fontWeight={700}>Regalos:</Text>
        <FormControl display={'flex'} flexWrap={['wrap','nowrap']} gap={'8px'}>
          <Input type='text' onChange={(e)=>setRegaloItem(e.target.value)} value={regaloItem} />
          <Button colorScheme={'blue'} onClick={addRegalo} w={['100%','30%']}>Agregar</Button>
        </FormControl>
        <ListaReglosComponent/>
        <Button w={'100%'} onClick={()=>setListRegalo([])} >Vaciar lista</Button>
        </Box>
    </Flex>
  );
}

export default App;
