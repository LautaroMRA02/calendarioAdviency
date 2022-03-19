import './App.css';
import React from 'react';
import { Box,Text,Flex,List,ListItem,FormControl,Input,Button,Center } from '@chakra-ui/react'
import { nanoid } from 'nanoid';
function App() {
  const [regaloObject, setRegaloObject] = React.useState({regalo:'',cantidad:''});
  const [ListRegalos, setListaRegalos] = React.useState(JSON.parse(localStorage.getItem("LStorageRegalos")) || []);
  React.useEffect(() => {
    localStorage.setItem("LStorageRegalos", JSON.stringify(ListRegalos))
  }, [ListRegalos])
  function addRegalo(){
    const item = 
    {
      id: `${nanoid()}`,
      regalo: regaloObject.regalo ? `${regaloObject.regalo} ${regaloObject.cantidad && `x${regaloObject.cantidad}`}`: -1, 
      cantidad: regaloObject.cantidad
    } 
    if(item.regalo ===  -1){
    } else{
      setListaRegalos(prevData=>[...prevData, item])
    }
    setRegaloObject({regalo:'',cantidad:''})
  };
  function deleteRegalo(event){
    let newArray = [];
    let idEvent = event.nativeEvent.path[1].id;
    setListaRegalos(prevData =>{
      for(let i =0; i<prevData.length;i++){
        if(prevData[i].id !== idEvent){newArray.push(prevData[i])};
      }
      return newArray
    })
  };
  function handleRegalo(event){
    setRegaloObject(prevData => {return {...prevData,[event.target.name]: event.target.value }})
  }

  function RegalosComponent(){
    const lista = ListRegalos.map((item)=><ListItem key={item.id} id={item.id} display={'flex'} flexWrap={'nowrap'} justifyContent={'space-between'}><p>{item.regalo}</p><Button size={'sm'} colorScheme={'red'} onClick={(e)=>deleteRegalo(e)}>X</Button></ListItem>)
    return(
      <List spacing={'4px'} fontWeight={'500'}>
        {lista.length === 0 ?  <Center><Text color={'gray.500'}>No hay Regalos! Agregá algo!</Text></Center> : lista }
      </List>
    )
  }
  return (
    <Flex flexDirection="column" >
        <Box bgColor={'whiteAlpha.800'} p={5} display={'flex'} gap={'8px'} flexWrap={['wrap','nowrap']} flexDir={'column'} borderRadius={10}>
        <Text fontSize='3rem' fontFamily={'Mountains of Christmas'} fontWeight={700}>Regalos:</Text>
        <FormControl display={'flex'} flexWrap={['wrap','nowrap']} gap={'8px'}>
          <Box display={'flex'} gap={'8px'}>
          <Input placeholder='Regalo...' borderColor={'gray.500'} w={'80%'}  autoComplete='off' type={'text'} name={'regalo'} onChange={handleRegalo} value={regaloObject.regalo}/>
          <Input placeholder='Cant.' borderColor={'gray.500'} w={'20%'} autoComplete='off' type={'number'} name={'cantidad'} onChange={handleRegalo} value={regaloObject.cantidad}/>
          </Box>
          <Button w={['100%','20%']} colorScheme={'blue'} onClick={(e)=>addRegalo(e)}>Agregar</Button>
        </FormControl>
        <RegalosComponent/>
        <Button colorScheme={'blue'} w={'100%'} onClick={()=>setListaRegalos([])}>Vaciar Lista</Button>
        </Box>
    </Flex>
  );
}

export default App;




