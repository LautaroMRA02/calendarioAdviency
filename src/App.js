import './App.css';
// import { Grid, GridItem } from '@chakra-ui/react'
import { Box,Text,Flex } from '@chakra-ui/react'
function App() {
  return (
    <Flex flexDirection="column" >
        <Box>
        <Text fontSize='2rem'>Regalos:</Text>
          <ul>
            <li>
              <Text>Medias</Text>
            </li>
            <li>
            <Text>Caramelos</Text>
            </li>
            <li>
            <Text>Vitel Tone</Text>
            </li>
          </ul>
        </Box>
    </Flex>
  );
}

export default App;
