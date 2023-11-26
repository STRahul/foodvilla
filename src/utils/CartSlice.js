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
         const existingData = state.cartItems.filter(item=>item.id===action.payload.id)

         if(existingData.length > 0){
            existingData[existingIndex].totalPrice += action.payload?.price | action.payload?.defaultPrice;
            existingData[existingIndex].quantity += action.payload.quantity;
         }
         else{
            const totalPrice = action.payload.price | action.payload.defaultPrice;
            state.cartItems.push({...action.payload,totalPrice})
         }
        },
        removeItem:(state,action)=>{
            const existingIndex = state.cartItems.findIndex(item=>item.id===action.payload.id);
            const existingData = state.cartItems.filter(item=>item.id===action.payload.id);
            let quantity;
            state.cartItems.map(item=>{
                if(item.id === action.payload.id){
                    quantity = item.quantity
                }
            })

            if(quantity === 1){
                state.cartItems = state.cartItems.filter(item=>item.id !== action.payload.id)
            }
            else {
                existingData[existingIndex].quantity -= 1;
                existingData[existingIndex].totalPrice -= existingData[existingIndex].price
            }
        },
        clearCart:(state)=>{
            state.cartItems = []
        }
    }
})

export const {addItem, clearCart, removeItem} = cartSlice.actions;


export default cartSlice.reducer;