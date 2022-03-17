import {React, useState} from 'react'
import "./App.css";
import {
  Box,
  Text,
  List,
  ListItem,
  FormControl,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { nanoid } from 'nanoid';

function App() {
  const [regalo, setRegalo] = useState({
    regalo: "",
    cand: ""
  })
  const [listaRegalo, setListaRegalo] = useState([])

  function addRegalo()
  {
    const itemRegalo = {
      id: nanoid(),
      regalo: `${regalo.regalo} ${regalo.cand && `x${regalo.cand}`}`,
      cantidad: regalo.cand,
    }
    setListaRegalo(prevData=>[...prevData, itemRegalo])
    setRegalo({
      regalo: "",
      cand: ""
    })
  }
  function deleteRegalo(event)
  {
    const newArray = [];
    const id = event.nativeEvent.path[1].id
    setListaRegalo(prevData => 
      {
        for(let i = 0; i < prevData.length; i++){if(prevData[i].id !== id){newArray.push(prevData[i])}}
        return newArray
      })
  }
  
  function handleChange(event) 
  {
    setRegalo(prevData => {
        return {
            ...prevData,
            [event.target.name]: event.target.value
        }
    })
    
  } 

  const lista = listaRegalo.map((item)=><ListItem key={item.id} id={item.id} display={'flex'} mb={'4px'}  alignContent={'center'} justifyContent={'space-between'}><Text >{item.regalo}</Text><Button size={'sm'} colorScheme={'red'} onClick={deleteRegalo}>X</Button></ListItem>)
  function ListRegalosComponent(){
    return(
      <List  overflowY={'auto'} >
        {listaRegalo.length === 0  ? <Center><Text>Agrega un regalo!</Text></Center>:lista}
      </List>
    )
  } 
  return (
      <Box bgColor={'whiteAlpha.800'} p={5} borderRadius={10} display={'flex'} flexWrap={'nowrap'} flexDir={'column'} h={['90vh','100%']} maxW={'450px'} gap={'8px'}>
        <Text fontSize="4rem" fontFamily={'Mountains of Christmas'} fontWeight={700}>Regalos:</Text>
        <FormControl display={'flex'} gap={'8px'} flexWrap={['wrap',"nowrap"]}>
          <Box display={'flex'} gap={'8px'} w={['100%','80%']}>
          <Input placeholder='Regalo...' autoComplete='off' type="text"   w={'80%'} name='regalo' onChange={handleChange} value={regalo.regalo} bgColor={'whitesmoke'}/>
          <Input placeholder='Cant...' autoComplete='off' type="number" w={'20%'} minW={'70px'} name='cand' id='cand' onChange={handleChange} value={regalo.cand} bgColor={'whitesmoke'}/>
          </Box>
          <Button w={['100%','20%']} colorScheme={'blue'} onClick={()=>addRegalo()}>Agregar</Button>
        </FormControl>
        <ListRegalosComponent/>
        <Button marginTop={['auto']} w={'100%'} colorScheme={'blue'} onClick={()=>setListaRegalo([])}>Vaciar lista</Button>
      </Box>
  );
}

export default App;
