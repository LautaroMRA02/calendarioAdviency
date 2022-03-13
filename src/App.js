import './App.css';
// import { Grid, GridItem } from '@chakra-ui/react'
import { Box,Text,Flex } from '@chakra-ui/react'
function App() {
  return (
    <Flex flexDirection="column" bg={'white'}>
        <Box style={{width:'300px'}}>
        <Text fontSize='3rem' style={{fontFamily: ['Mountains of Christmas','cursive'],fontWeight:700,textAlign:'center'}}>Regalos:</Text>
          <ul>
            <li>
              <Text fontSize="1.2rem">Medias</Text>
            </li>
            <li>
              <Text fontSize="1.2rem">Caramelos</Text>
            </li>
            <li>
              <Text fontSize="1.2rem">Vitel Tone</Text>
            </li>
          </ul>
        </Box>
    </Flex>
  );
}

export default App;
