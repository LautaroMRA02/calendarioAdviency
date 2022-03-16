import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Flex,ChakraProvider } from '@chakra-ui/react'
ReactDOM.render(
  <ChakraProvider>
    <Flex flexDirection="column" align="center" justify="center" h={'400%'}>
      <App />
    </Flex>
  </ChakraProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
