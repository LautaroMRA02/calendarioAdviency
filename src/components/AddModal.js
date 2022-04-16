import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  Text,
  ModalHeader,
  ModalBody,
  Input,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";

const AddModal = ({
  regaloState,
  setRegaloState,
  ListaRegalos,
  setListaRegalos,
  isOpenAdd,
  onCloseAdd,
}) => {
  function handleRegalo(e) {
    setRegaloState((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  }
  function addRegalo() {
    setListaRegalos((prevData) => {
      const item = { ...regaloState, id: nanoid() };
      return [...prevData, item];
    });
    setRegaloState({
      regalo: "",
      destinario: "",
      cantidad: "",
      imagen: "",
    });
  }

  const regalosAleatorios = [
    "Kit de uñas",
    "Gorrito",
    "Guantes",
    "Leggings",
    "Calentadores",
    "Bufanda",
    "Perfume",
    "Maletín con juego de llaves",
    "Atornillador",
    "Sacacorchos",
    "Tirador de cerveza",
    "Juego cubos de hielo",
    "Recortador de barba",
    "Kit cuidado para barba",
  ];
  function regaloRandom(){
    const num  = Math.floor(Math.random() * (14 - 1)) + 1;
    document.getElementById('regalo').value = regalosAleatorios[num]
    setRegaloState((prevData) => {
      return { ...prevData, regalo: regalosAleatorios[num] };
    });
  }


  return (
    <Modal isOpen={isOpenAdd} onClose={onCloseAdd}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Agregar Regalo</Text>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <form>
            <FormLabel htmlFor="" as="legend">
              Regalo
            </FormLabel>
            <Flex flexDir={"row"} gap={"8px"}>
              <Input
                onChange={handleRegalo}
                variant={"filled"}
                autoComplete="off"
                type={"text"}
                name="regalo"
                alt="regalo"
                id="regalo"
              />
              <Button onClick={regaloRandom}>Aleatorio</Button>
            </Flex>
            <FormLabel htmlFor="destinario" as="legend">
              Destinario
            </FormLabel>
            <Input
              onChange={handleRegalo}
              variant={"filled"}
              autoComplete="off"
              type={"text"}
              name="destinario"
              alt="destinario"
              id="destinario"
            />
            <FormLabel htmlFor="cantidad" as="legend">
              Cantidad
            </FormLabel>
            <Input
              onChange={handleRegalo}
              variant={"filled"}
              autoComplete="off"
              type={"number"}
              name="cantidad"
              alt="cantidad"
              id="cantidad"
            />
            <FormLabel htmlFor="imagen" as="legend">
              Imagen(url)
            </FormLabel>
            <Input
              onChange={handleRegalo}
              variant={"filled"}
              autoComplete="off"
              type={"text"}
              name="imagen"
              alt="imagen"
              id="imagen"
            />
            <Flex mt={"16px"}>
              <Button mr={"auto"} onClick={onCloseAdd}>
                Cerrar
              </Button>
              <Button colorScheme="blue" onClick={addRegalo}>
                Agregar
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddModal;
