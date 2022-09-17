import {  Stack, Button, Modal , ModalContent, Input, FormLabel } from '@chakra-ui/react'


function EditModal({isOpenEdit,onCloseEdit,SELECTED_REGALO,REGALO_ONCHANGE_EDIT,EDIT_REGALO}){


    return (
      <Modal isCentered isOpen={isOpenEdit} onClose={onCloseEdit}>
      <ModalContent p={3}>
        <Stack direction={'column'}>
          <Stack direction={'row'} justifyContent='space-between'>
            <h1>Editar</h1>
            <Button onClick={()=>onCloseEdit()} bgColor='red.500'>X</Button>
          </Stack>
          <form onChange={(e)=>REGALO_ONCHANGE_EDIT(e)}>
            <FormLabel htmlFor='regalo'>Regalo:</FormLabel>
            <Input id="regalo" name="regalo" type='text'  alt='input regalo' defaultValue={SELECTED_REGALO?.regalo}/>
  
            <FormLabel htmlFor='cantidad'>Cantidad:</FormLabel>
            <Input id='cantidad' name='cantidad' type='number' alt='input cantidad' defaultValue={SELECTED_REGALO?.cantidad}/>
  
            <FormLabel htmlFor='valor'>Valor:</FormLabel>
            <Input id='valor' name='valor' type='number' alt='input valor' defaultValue={SELECTED_REGALO?.valor}/>
  
            <FormLabel htmlFor='para'>Para:</FormLabel>
            <Input id='para' name='para' type='text' alt='input para' defaultValue={SELECTED_REGALO?.para}/>
  
            <FormLabel htmlFor='imagen'>Imagen(url):</FormLabel>
            <Input id='imagen' name='imagen' type='url' alt='input imagen url' defaultValue={SELECTED_REGALO?.imagen}/>
          </form>
          <Button onClick={()=>EDIT_REGALO()} bgColor='gree.500'>Editar</Button>
        </Stack>
      </ModalContent>
    </Modal>
    )
  }
export default EditModal;