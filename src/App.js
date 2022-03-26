import React from 'react'
import './App.css';
import { Box,Text,Flex,Input,Button,List,ListItem,Center,Image  } from '@chakra-ui/react'
import {nanoid} from 'nanoid'
import { CSSTransition} from 'react-transition-group';
import {FcQuestions, } from 'react-icons/fc'
import { Icon } from '@chakra-ui/react'

function App() {
  const [regaloObject, setRegaloObject] = React.useState({
    regalo: "",
    cantidad:"",
    imagen:"",
    destinario: "",
  })
  const [ListaRegalo, setListaRegalo] = React.useState( JSON.parse(localStorage.getItem("LSsetListaRegalo")) || [])
  const [showButton, setShowButton] = React.useState(false)
  function addRegalo(){
    const item = {
      ...regaloObject,
      id: nanoid()
    }
  setListaRegalo(prevData=>[...prevData, item])
  setRegaloObject({
    regalo: "",
    cantidad:"",
    imagen:"",
    destinario: "",
  })
  }
  function removeRegalo(event){
    let id = event.nativeEvent.path[1].id
    setListaRegalo(prevData=>{
      let newData = [];
      for(let i = 0; i < prevData.length; i++){if(id !== prevData[i].id){newData.push(prevData[i])}}
      return newData
    })
  }

  function handleRegalo(event){
    setRegaloObject(prevData => {
      return {
        ...prevData,
        [event.target.name]:event.target.value
      }
    })
  }

  React.useEffect(()=>{
    localStorage.setItem('LSsetListaRegalo', JSON.stringify(ListaRegalo))
  },[ListaRegalo])

  function ListaRegaloComponent(props){
    if(props.statusRegalos){
      return (
          <List spacing={'8px'} overflowY={'auto'}>
            {ListaRegalo.map((item)=> (
              <ListItem  id={item.id} display={'flex'} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Flex>
                  {item.imagen === '' ? <Icon as={FcQuestions} boxSize={'48px'}/>:<Image boxSize={'48px'} src={item.imagen}/>}
                  <Flex marginLeft={'4px'}  flexDir={'column'} flexWrap={'nowrap'} lineHeight={'15px'} justifyContent={'center'}>
                    <Text fontWeight={600}>
                    {item.regalo}  {item.cantidad && `x${item.cantidad}`}
                    </Text>
                    <Text color={'gray.500'} marginLeft={'4px'}>
                    {item.destinario}
                    </Text>
                  </Flex>
                  </Flex>
                  <Button className='remove-btn' onClick={removeRegalo} colorScheme={'red'} size={'sm'}>&times;</Button>
                </ListItem>
              )
            )}
          </List>

      )
    } else {
      return (<Center><Text color={'gray.500'}>No hay regalos! Agregé algo!</Text></Center>)
    }
  }
  return (

    <Flex flexDirection="column" >
        <Flex 
        flexDir='column' 
        zIndex={1}  
        id='menu'
        bgColor={'whiteAlpha.800'}
        p={5}
        width={['90vw','400px']}
        gap={'8px'}
        height={['90vh','auto']}
        >
          <Text fontSize='3rem' fontFamily={'Mountains of Christmas'} fontWeight={700}>Regalos:</Text>
          <Button colorScheme={'blue'} onClick={()=>setShowButton(true)}>Agregar</Button>
          <ListaRegaloComponent   statusRegalos={ListaRegalo.length >= 1} />
          <Button s marginTop={'auto'} colorScheme={'blue'} onClick={()=>setListaRegalo([])}>Borrar Lista</Button>
        </Flex>

        <CSSTransition in={showButton} timeout={300} unmountOnExit classNames="my-node">
          <Flex 
          zIndex={2} 
          position={'absolute'}
          bgColor={'white'}
          flexDir={'column'}
          width={['90vw','400px']}
          p={5}
          marginBottom={'8px'}
          gap={'8px'}
          >
            <Box display={'flex'} flexDir={'column'} gap={'8px'} >
              <Input id='input1' onKeyDown={(event)=> {if(event.key === "Enter"){document.getElementById('input2').focus()}} } autoComplete='off' type={'text'} name={'regalo'} placeholder="Regalo..." onChange={handleRegalo} value={regaloObject.regalo} />
              <Input id='input2' onKeyDown={(event)=> {if(event.key === "Enter"){document.getElementById('input3').focus()}} } autoComplete='off' type={'number'} name={"cantidad"}placeholder="Cant..." onChange={handleRegalo} value={regaloObject.cantidad}/>
              <Input id='input3' onKeyDown={(event)=> {if(event.key === "Enter"){document.getElementById('input4').focus()}} } autoComplete='off' type={'text'} name={"destinario"} placeholder="Destinario..." onChange={handleRegalo} value={regaloObject.destinario}/>
              <Input id='input4' onKeyDown={(event)=> {if(event.key === "Enter"){addRegalo();document.getElementById('input1').focus()}} } autoComplete='off' type={'text'} name={"imagen"} placeholder="https://imagen..." onChange={handleRegalo} value={regaloObject.imagen}/>
            </Box>
            <Flex justifyContent={'space-between'}>
              <Button colorScheme={'red'} onClick={()=>setShowButton(false)}>Cancelar</Button>
              <Button colorScheme={'blue'} onClick={addRegalo}>Agregar</Button>
            </Flex>

          </Flex>
        </CSSTransition>
    </Flex>
  );
}

export default App;
