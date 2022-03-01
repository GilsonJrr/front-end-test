import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice ({
    name: 'ModalValues',
    initialState: {
        ModalNumber: '',
        ModalMPrice: '',
        ModalSPrice: '',
    },
    
    reducers: {
        setModalNumber: (state, action) => {
            state.ModalNumber = action.payload
        },
        setModalMPrice: (state, action) => {
            state.ModalMPrice = action.payload
        },
        setModalSPrice: (state, action) => {
            state.ModalSPrice = action.payload
        },
    }
})

export const {setModalNumber, setModalMPrice, setModalSPrice} = modalSlice.actions;

export default modalSlice.reducer;