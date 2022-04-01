import {React , useState, useEffect} from 'react'
import './App.css';
import {nanoid} from 'nanoid'
import { CSSTransition} from 'react-transition-group';
import {FcQuestions, } from 'react-icons/fc'
import { Image,Text,Flex,Button,Icon,List,ListItem, Center, Input } from '@chakra-ui/react'
function App() {
  const [RegaloObject, setRegaloObject] = useState({
    regalo: '',
    cantidad: '',
    destinario: '',
    imagen: '',
  })
  const [EditObject, setEditObject] = useState(null)
  const [ListaRegalos, setListaRegalos] = useState( JSON.parse(localStorage.getItem("LSListaRegalos")) || [])
  
  const [showAddComponent, setShowAddComponent] = useState(false)
  const [showEditComponent, setShowEditComponent] = useState(false)

  useEffect(() => {
    localStorage.setItem("LSListaRegalos",JSON.stringify(ListaRegalos))
  }, [ListaRegalos])
  
  function addRegalo(event)
  {
    let item = 
    {
      ...RegaloObject,
      id: nanoid()
    }
    if(item.regalo === ''){
    }else{
      setListaRegalos(prevData=> {return[...prevData,item]})
    }
    setRegaloObject({
      regalo: '',
      cantidad: '',
      destinario: '',
      imagen: '',
    })
  };

  function removeRegalo(event)
  {
    const id = event.nativeEvent.path[2].id
    console.log(id)
    setListaRegalos(prevData=>{
      const newLista = prevData.filter(item => item.id !== id)
      return newLista
    })
    }

  function editedRegalo(event)
  {
    setShowAddComponent(false)
    const id = event.nativeEvent.path[2].id
    setEditObject(prevData =>{
      const item = ListaRegalos.filter(item => item.id === id)
      return item[0]
    })
    setShowEditComponent(true)
  }
  function addEdit(){
    setListaRegalos(prevData => {
    const newArray = ListaRegalos.map(item => {
      if(item.id === EditObject.id){
        return EditObject
      } else {
        return item
      }
    })
    return newArray
      
    });
  }
  function handleRegaloObject(event)
  {
    setRegaloObject(prevData=>{return{...prevData,[event.target.name]:event.target.value}})
  }
  function handleEditObject(event)
  {
    setEditObject(prevData=>{return{...prevData,[event.target.name]:event.target.value}})
  }
  function ListaRegalosComponent(){
    const lista = ListaRegalos.map((item)=>(
      <ListItem key={item.id} id={item.id} display={'flex'} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Flex gap={'8px'}>
        {item.imagen === '' ? <Icon as={FcQuestions} boxSize={'48px'} /> : <Image src={item.imagen} fallbackSrc='https://via.placeholder.com/150' boxSize={'48px'} objectFit='cover' alt={item.regalo}/>}
        <Flex flexDir={'column'}  justifyContent={'flex-start'}>
          <Text>{item.regalo} {item.cantidad !== '' && `x${item.cantidad}`  }</Text>
          <Text marginLeft={'4px'} color={'GrayText'}>{item.destinario}</Text>
        </Flex>
        </Flex>
        <Flex flexDir={'row'} gap={'8px'}>
          <Button onClick={editedRegalo} size={'sm'}>E</Button>
          <Button onClick={removeRegalo} size={'sm'}>X</Button>
        </Flex>
      </ListItem>
    ))
    return(
      <List spacing={'4px'}>
       {lista.length === 0 ? <Center><Text color={'GrayText'}>No hay regalos! Agrege Algo!</Text></Center>:lista}
      </List>
    )
  };
  return (
    <Flex flexDirection="column" >
        <Flex bgColor={'white'} flexDir={'column'} p={5} w={['90vw','500px']} h={['90vh','auto']} gap={'8px'} pointerEvents={showEditComponent || showAddComponent ? 'none':'all'} opacity={showEditComponent || showAddComponent ? 0.5 : 1}>
          <Text fontSize='3rem' fontFamily={'Mountains of Christmas'} fontWeight={700}>Regalos:</Text>
          <Button onClick={()=>setShowAddComponent(true)} colorScheme={'blue'}>Agregar</Button>
          <ListaRegalosComponent/>
          <Button marginTop={'auto'} onClick={()=>setListaRegalos([])} colorScheme={'blue'}>Borrar Lista</Button>
        </Flex>

        {/* {MODALS MODALS MODALS MODALS MODALS MODALS} */}
        {/* {MODALS MODALS MODALS MODALS MODALS MODALS} */}
        {/* {MODALS MODALS MODALS MODALS MODALS MODALS} */}
        <CSSTransition
          in={showAddComponent}
          classNames="my-node"
          unmountOnExit
           timeout={300}
        >
          <Flex bgColor={'white'} flexDir={'column'} p={5}  gap={'8px'} className={'ccc'} w={['90vw','300px']}>
            <Flex flexDir={'column'} gap={'4px'} >
              <Input autoComplete='off' value={RegaloObject.regalo} onChange={handleRegaloObject} type={'text'} id='regalo' name='regalo' placeholder='Regalo...'/>
              <Input autoComplete='off' value={RegaloObject.destinario} onChange={handleRegaloObject} type={'text'} id='destinario' name='destinario' placeholder='Destinario...'/>
              <Input autoComplete='off' value={RegaloObject.cantidad} onChange={handleRegaloObject} type={'number'} id='cantidad' name='cantidad' placeholder='Cant...'/>
              <Input autoComplete='off' value={RegaloObject.imagen} onChange={handleRegaloObject} type={'text'} id='imagen' name='imagen' placeholder='https://imagen...'/>
            </Flex>
            <Flex flexDir={'row'} justifyContent={'space-between'}>
            <Button onClick={()=>setShowAddComponent(false)}>X</Button>
            <Button onClick={addRegalo} colorScheme={'blue'}>Agregar</Button>
            </Flex>
          </Flex>
        </CSSTransition>
        <CSSTransition
          in={showEditComponent}
          classNames="my-node"
          unmountOnExit
          timeout={300}
        >
          <Flex flexDir={'column'} bgColor={'white'} p={5}  gap={'8px'}  className={'ccc'} w={['90vw','300px']}>
            <Flex flexDir={'column'} gap={'4px'}>
              <Input autoComplete='off' value={EditObject?.regalo} onChange={handleEditObject}      type={'text'} id='regalo' name='regalo' placeholder='Regalo...'/>
              <Input autoComplete='off' value={EditObject?.destinario} onChange={handleEditObject}  type={'text'} id='destinario' name='destinario' placeholder='Destinario...'/>
              <Input autoComplete='off' value={EditObject?.cantidad} onChange={handleEditObject}  type={'number'} id='cantidad' name='cantidad' placeholder='Cant...'/>
              <Input autoComplete='off' value={EditObject?.imagen} onChange={handleEditObject}  type={'text'} id='imagen' name='imagen' placeholder='https://imagen...'/>
            </Flex>
            <Flex flexDir={'row'} justifyContent={'space-between'}>
            <Button onClick={()=>setShowEditComponent(false)}>X</Button>
            <Button onClick={addEdit} colorScheme={'whatsapp'}>Guardar</Button>
            </Flex>
          </Flex>
        </CSSTransition>
        {/* {MODALS MODALS MODALS MODALS MODALS MODALS} */}
        {/* {MODALS MODALS MODALS MODALS MODALS MODALS} */}
        {/* {MODALS MODALS MODALS MODALS MODALS MODALS} */}
    </Flex>
  );
}

export default App;




