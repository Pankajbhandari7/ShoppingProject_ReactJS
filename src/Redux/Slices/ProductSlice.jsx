import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({

    name: "cart",

    initialState: {
        cartData:[],
        searchData: []
    },

    reducers:{
        addToProduct: (state, action)=>{
            let findIndexValue = state.cartData.findIndex((value)=> value.id === action.payload.id); // -1

            if(findIndexValue >= 0){
                state.cartData[findIndexValue].quantity += 1;
            }
            else{
                let newData = {...action.payload, quantity: 1};
                state.cartData = [...state.cartData, newData]
            } 
        },
        deleteToProduct: (state, action)=>{
           let itemValue = state.cartData.filter((value)=> value.id !== action.payload)
            state.cartData = itemValue;
        },
        removeToProduct: (state, action)=>{
            let findIndexValue = state.cartData.findIndex((value)=> value.id === action.payload.id); // -1

            if(findIndexValue >= 0){
                state.cartData[findIndexValue].quantity -= 1;
            }
        }, 
        searchProductData : (state, action)=>{
            // console.log(action.payload);
            
            state.searchData = action.payload;
        }
    }

});

export const AllProductSlice = createSlice({
    name: "product",
    initialState: {
        productData: []
    },
    reducers: {
        addAll: (state, action) => {
            state.productData = action.payload;
        }
    }
});

export const { addAll } = AllProductSlice.actions;

export default ProductSlice.reducer;
export const{ addToProduct, deleteToProduct, removeToProduct, searchProductData } = ProductSlice.actions;