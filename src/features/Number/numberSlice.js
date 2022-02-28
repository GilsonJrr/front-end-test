import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const numberSlice = createSlice ({
    name: 'number',
    initialState: {
        itens: [],
    },
    
    reducers: {
        setNumber: (state, action) => {
            state.itens = action.payload
        },
        add: (state, action) => {
            state.itens.push(action.payload)
        },
        del: (state, action) => {
            state.itens = state.itens.filter((number) => number.id !== action.payload.id)
        },
        update: (state, action) => {
            state.itens.map((numbers) => {
                if(numbers.id === action.payload.id){
                    numbers.value = action.payload.value;
                    numbers.monthyPrice = action.payload.monthyPrice;
                    numbers.setupPrice = action.payload.setupPrice;
                }
            })
        }
    }
})

export const {setNumber, del, add, update} = numberSlice.actions;

export const retrivedNumber = () => (dispatch) => {
    api
    .get("Numbers")
    .then(response => {
      const retrivedNumber = Object.values(response.data);
      dispatch(setNumber(retrivedNumber));
    });
}; 

export default numberSlice.reducer;