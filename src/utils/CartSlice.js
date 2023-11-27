import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:[]
    },
    reducers:{
        addItem:(state,action)=>{
         const restId = state.cartItems.findIndex(item=>item.restId===action.payload.restId);
         if(restId === -1) {
             state.cartItems = [];
         }
         const existingIndex = state.cartItems.findIndex(item=>item.id===action.payload.id);
         const existingData = state.cartItems[existingIndex];
         if(existingData){
            existingData.totalPrice += action.payload?.price | action.payload?.defaultPrice;
            existingData.quantity += action.payload.quantity;
         }
         else{
            const totalPrice = action.payload.price | action.payload.defaultPrice;
            state.cartItems.push({...action.payload,totalPrice})
         }
        },
        removeItem:(state,action)=>{
            const existingIndex = state.cartItems.findIndex(item=>item.id===action.payload.id);
            const existingData = state.cartItems[existingIndex];
            let quantity = existingData.quantity;

            if(quantity === 1){
                state.cartItems = state.cartItems.filter(item=>item.id !== action.payload.id)
            }
            else {
                existingData.quantity -= 1;
                existingData.totalPrice -= existingData.price | existingData.defaultPrice;
            }
        },
        clearCart:(state)=>{
            state.cartItems = []
        }
    }
})

export const {addItem, clearCart, removeItem} = cartSlice.actions;


export default cartSlice.reducer;