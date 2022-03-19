import React from 'react';
import './App.css';
import { Box,Text,Flex,Input,Button,FormControl,List,ListItem,Center,Image  } from '@chakra-ui/react'
import {nanoid} from 'nanoid'
import {FcQuestions} from 'react-icons/fc'
import { Icon } from '@chakra-ui/react'

function App() {
  const [regaloObject, setRegaloObject] = React.useState({
    regalo:   '',
    cantidad: '',
    imagen:   '',
  })
  const [ListaRegalos, setListaRegalos] = React.useState(JSON.parse(localStorage.getItem('LSListaRegalos')) || [])
  React.useEffect(()=>{
    localStorage.setItem('LSListaRegalos',JSON.stringify(ListaRegalos))
  },[ListaRegalos])

  function addRegalo(){
    const item = {
      ...regaloObject,
      id: nanoid(),
    }
    if(item.regalo === ''){
    }
     else {
      setListaRegalos(prevData =>[...prevData, item])
    }
    setRegaloObject({
      regalo:   '',
      cantidad: '',
      imagen:   '',
    })
  };
  function removeRegalo(e){
    let newArray= [];
    let id = e.nativeEvent.path[1].id;
    setListaRegalos(prevData => {
    for(let i = 0; i < prevData.length ; i++){if(prevData[i].id !== id){newArray.push(prevData[i])}}
    return newArray
    })
  };

  function handleRegaloObject(e){
    console.log('ccc')
    console.log(regaloObject)
    setRegaloObject(prevData =>{
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })   
  }
  function ListaRegalosComponent(){
    const lista = ListaRegalos.map((item)=>{
      return(
        <ListItem key={item.id} id={item.id} display={'flex'} flexWrap={'nowrap'} justifyContent={'space-between'} alignItems={'center'} >
            <Box display={'flex'} flexWrap={'nowrap'} gap={'8px'} alignItems={'center'}>
              {item.imagen === '' ? <Icon as={FcQuestions} boxSize={'48px'} /> : <Image src={item.imagen} boxSize={'48px'} objectFit='cover' alt={item.regalo}/>}
              <Text>{item.regalo} {item.cantidad && `x${item.cantidad}`}</Text>
            </Box>
            <Button size={'sm'} colorScheme={'red'} onClick={removeRegalo}>X</Button>
        </ListItem>
      )
    })
    return (
      <List spacing={'8px'}>
          {lista.length === 0 ? <Center><Text color={'gray.400'}> No hay regalos! Agrega algo!</Text></Center>: lista}
      </List>
    )
  };
  return (
    <Flex flexDirection="column" >
        <Box  bgColor={'whiteAlpha.900'} maxW={'600px'} p={5} display={'flex'} flexDir={'column'} gap={'8px'} flexWrap={'nowrap'} borderRadius={10}>
        <Text fontSize='3rem' fontFamily={'Mountains of Christmas'} fontWeight={700}>Regalos:</Text>
        <FormControl display={'flex'} flexWrap={['wrap','nowrap']}  gap={'8px'}>
          <Box display={'flex'} flexWrap={['wrap','nowrap']} gap={'8px'}>
            <Input autoComplete='off' placeholder='Regalo...' w={['100%','50%']}type={'text'} name={'regalo'} id={'regalo'} onChange={handleRegaloObject} value={regaloObject.regalo}/>
            <Box display={'flex'} w={['100%','50%']} gap={'8px'}>
              <Input autoComplete='off' placeholder='https://imagen...' w={['80%','100%']} type={'text'} name={'imagen'} id={'imagen'} onChange={handleRegaloObject} value={regaloObject.imagen}/>
              <Input autoComplete='off' placeholder='Cant.' w={['20%','6rem']} type={'number'} name={'cantidad'} id={'cantidad'} onChange={handleRegaloObject} value={regaloObject.cantidad}/>
            </Box>
          </Box>
          <Button w={["100%","auto"]} colorScheme={'blue'} onClick={addRegalo}>Agregar</Button>
        </FormControl>
        <ListaRegalosComponent/>
          <Button w={'100%'} colorScheme={'blue'} onClick={()=>setListaRegalos([])}>Borrar Lista</Button>

        </Box>
    </Flex>
  );
}

export default App;




