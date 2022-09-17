import {  Stack, Button, Modal , ModalContent, Input, FormLabel } from '@chakra-ui/react'


function CleanRegalos({isOpenEdit,onCloseEdit}){


    return (
      <Modal isCentered isOpen={isOpenEdit} onClose={onCloseEdit}>
      <ModalContent p={3}>
         
      </ModalContent>
    </Modal>
    )
  }
export default CleanRegalos;