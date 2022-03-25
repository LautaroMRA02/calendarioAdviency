import React from 'react';
import './App.css';
import { Box,Text,Flex,Input,Button,FormControl,List,ListItem,Center,Image  } from '@chakra-ui/react'
import {nanoid} from 'nanoid'
import {FcQuestions} from 'react-icons/fc'
import { Icon } from '@chakra-ui/react'
import { CSSTransition } from 'react-transition-group'


function App() {
  const [regaloObject, setRegaloObject] = React.useState({
    regalo:   '',
    cantidad: '',
    imagen:   '',
  })
  const [ListaRegalos, setListaRegalos] = React.useState(JSON.parse(localStorage.getItem('LSListaRegalos')) || [])
  const [showButton, setShowButton] = React.useState(true);
  const [showMessage, setShowMessage] = React.useState(false);

  React.useEffect(()=>{
    localStorage.setItem('LSListaRegalos',JSON.stringify(ListaRegalos))
  },[ListaRegalos])

  function addRegalo(){
    const item = {
      id: nanoid(),
      regalo:   regaloObject.regalo,
      cantidad: regaloObject.cantidad,
      imagen:   regaloObject.imagen,
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
    console.log(id)
    setListaRegalos(prevData => {
    for(let i = 0; i < prevData.length ; i++){
      if(prevData[i].id !== id)
      {newArray.push(prevData[i])}
    }
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
        <Box>

        <Box h={['90vh','auto']} transition={'all 1s '} bgColor={!showMessage?'white':'gray.400'} w={['99vw','60vw','500px']} p={5} display={'flex'} flexDir={'column'} gap={'8px'} flexWrap={'nowrap'} borderRadius={10}>
        <Text pointerEvents={!showMessage?'none':'all'} fontSize='3rem' fontFamily={'Mountains of Christmas'} fontWeight={700}>Regalos:</Text>
        <Button
          onClick={() => setShowMessage(true)}
          w='100%'
          pointerEvents={showMessage?'none':'all'}
          colorScheme={showMessage?'facebook':'blue'}
        >Agregar</Button>
        <ListaRegalosComponent/>
          <Button pointerEvents={showMessage?'none':'all'} marginTop={'auto'} w={'100%'} colorScheme={showMessage?'facebook':'blue'} onClick={()=>setListaRegalos([])}>Borrar Lista</Button>



        </Box>
        <CSSTransition
          in={showMessage}
          timeout={300}
          classNames="alert"
          unmountOnExit
          onEnter={() => setShowButton(false)}
          onExited={() => setShowButton(true)}
        >
          <Flex
            position={'absolute'}
            w={['99vw','60vw','500px']}
            p={5}
            dismissible='true'
            onClose={() => setShowMessage(false)}
            bgColor={'white'}
            top={'25vh'}
            borderRadius={10}
          >
        <FormControl display={'flex'} flexWrap={'wrap'}  flexDir={'column'} gap={'16px'}>
          <Box display={'flex'} flexWrap={'nowrap'} gap={'8px'} flexDir={'column'}>
            <Input autoComplete='off' placeholder='Regalo...' w={'100%'} type={'text'} name={'regalo'} id={'regalo'} onChange={handleRegaloObject} value={regaloObject.regalo}/>
              <Input autoComplete='off' placeholder='https://imagen...' w={'100%'} type={'text'} name={'imagen'} id={'imagen'} onChange={handleRegaloObject} value={regaloObject.imagen}/>
              <Input autoComplete='off' placeholder='Cant.' w={'100%'} type={'number'} name={'cantidad'} id={'cantidad'} onChange={handleRegaloObject} value={regaloObject.cantidad}/>
          </Box>
          <Flex flexDir={'row'} justifyContent={'space-between'}>
          <Button onClick={() => setShowMessage(false)}>
            Cerrar
          </Button>
          <Button w={["auto"]} colorScheme={'blue'} onClick={addRegalo}>Agregar</Button>
          </Flex>
        </FormControl>
        </Flex>
        </CSSTransition>
        </Box>

  );
}

export default App;




