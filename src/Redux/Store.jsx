import { configureStore } from "@reduxjs/toolkit";
import  ProductSlice  from "./Slices/ProductSlice";


const Store = configureStore({
    reducer :{
        cart : ProductSlice
    }
});

export default Store;