import {React,useState} from 'react'
import './App.css';
import { nanoid } from 'nanoid';
import { Box,Text,Flex,FormControl,Button,Input,List,ListItem,Center  } from '@chakra-ui/react'
function App() {
  const [regaloItem, setregaloItem] = useState('')
  const [listaRegalos, setlistaRegalos] = useState([])
  const Regalos =listaRegalos.map(item => (
        <ListItem 
          key={item.id} 
          id={item.id} 
          display='flex' 
          flexWrap='nowrap' 
          justifyContent='space-between' 
          alignItems='center' 
          fontSize={'1.2rem'}
          fontWeight={'bold'}
        >
          <Text>{item.regalo}</Text> 
          <Button colorScheme={'blue'} size='sm' onClick={(e)=>deleteRegalo(e)}>X</Button>
        </ListItem>  ))
        

  function deleteRegalo(e){
    let id = e.nativeEvent.path[1].id
    let newArray = [];
    setlistaRegalos(prevlistaRegalos => {
      for(let i = 0;i < prevlistaRegalos.length; i++){if(prevlistaRegalos[i].id !== id){newArray.push(prevlistaRegalos[i])};}
      return newArray
    })}

  function agregarRegalo(){
  const useRegalo = {id:nanoid(),regalo:`${regaloItem}`}
  setlistaRegalos(prevlistaRegalos => [...prevlistaRegalos,useRegalo] )
  setregaloItem('')}
  function ListRegalos(){return(<List>{Regalos}</List>)}
  return (
    <Flex flexDirection="column" backgroundColor={'white'} p={5} borderRadius={10}>
        <Box>
        <Text fontSize='3rem' style={{fontFamily:'Mountains of Christmas',fontWeight:700}}>Regalos:</Text>
        <FormControl pt={4} pb={4} display={'flex'} gap={'8px'} flexWrap={ ['wrap','nowrap','nowrap','nowrap']}>
          <Input onKeyDown={(e)=>{e.code === 'Enter' && agregarRegalo() }} onChange={(e)=>setregaloItem(e.target.value)}  name='regalo' id='regalo' type={'text'} autoComplete="off" value={regaloItem} />
          <Button type='submit' onClick={()=>agregarRegalo()} colorScheme={'blue'} width={['100%','30%','30%','30%']}>Agregar</Button>
        </FormControl>
        {listaRegalos.length === 0 ? <Center ><Text color='gray.500' isTruncated>Agregar regalo</Text></Center>:  <ListRegalos/>}
        </Box>
    </Flex>
  );
}

export default App;




