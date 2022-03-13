import {React, useState} from 'react';
import './App.css';
// import { Grid, GridItem } from '@chakra-ui/react'
import { Box,Text,Input,Button } from '@chakra-ui/react'
function App() {
	const [Regalo, setRegalo] = useState(() => '')
	const [Regalos, setRegalos] = useState(["Medias","Caramelos","Gato"])
	function handleSubmit(e){
		e.preventDefault();
		setRegalos(prevRegalos=> [...prevRegalos,Regalo])
		setRegalo('')
		document.getElementById('regalo').reset()
	}
	const RegalosList = Regalos.map((item)=> <li><Text>{item}</Text></li>)
	return (
				<Box bg={'white'} p={8} borderRadius={10} >
				<Box pt={4} pb={4}>
						<Text fontSize='3rem' style={{fontFamily:['Mountains of Christmas'],fontWeight:700}}>Regalos:</Text>
				</Box>
				<form onSubmit={handleSubmit} id="regalo" style={{display:'flex',flexWrap:'wrap',gap: '8px',justifyContent:'space-between'}} >
					<Input
						onChange={(e)=>setRegalo(e.target.value)} 
						name="regalo" type={'text'} 
						placeholder="Agregue regalo" 
						autocomplete="off"
							width={{
							base: '100%', // 0-48em
							md: '70%', // 48em-80em,
							xl: '70%', // 80em+
							}}
					/> 
					<Button
						type='submit' 
						colorScheme='blue' 
						onClick={(e)=>e.submit()}
						width={{
							base: '100%', // 0-48em
							md: '27%', // 48em-80em,
							xl: '27%', // 80em+
							}}
						>Agregar</Button>
				</form>
				<Box  pt={4} pb={4}>
						<ul style={{fontWeight:'bold',listStyle:'none'}}>
						{RegalosList}
						</ul>
				</Box>
				</Box>
				
	);
}

export default App;
