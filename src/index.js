import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Flex, ChakraProvider } from '@chakra-ui/react'
ReactDOM.render(
  <ChakraProvider>
    <Flex flexDirection="column" align="center" justify="center" h={'400%'}>
      <App />
    </Flex>
  </ChakraProvider>,
  document.getElementById('root')
);
