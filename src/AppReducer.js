import { StackItem } from '@chakra-ui/react'
import {nanoid} from 'nanoid'


export const INITIAL_STATE = {
    loading: false ,
    error: false,
    regalos: [],
}

export const regalosReducer = (state,action) => {


    switch (action.type) {
        case 'START':
            return { loading: true , error: false, regalos: [] }
        case 'SUCCESS':
            return { loading: false , error: false, regalos: action.payload.value }
        case 'ERROR':
            return { loading: true , error: true, regalos: [] }
        case 'ADD_REGALO':
            return {
                ...state,
                regalos: [...state.regalos, {...action.payload.value, id: nanoid() }]
            }
        case 'DELETE_REGALO':
            const newData_REMOVE = state.regalos.filter(item => item.id != action.payload.id )
            return {
                ...state,
                regalos: newData_REMOVE
            }
        case 'EDIT_REGALO':
            const newData_EDIT = state.regalos.map(item => {
                if(item.id === action.payload.value.id){
                    return action.payload.value
                } else {
                    return item
                }
            })
            return {
                ...state,
                regalos: newData_EDIT
            }
        case 'REMOVE_ALL':
            return {
                ...state,
                regalos: []
            }
        default:
            return state;
    }
}
