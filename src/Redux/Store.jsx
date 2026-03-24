import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Slices/ProductSlice";
import { AllProductSlice } from "./Slices/ProductSlice";


const Store = configureStore({
    reducer: {
        cart: ProductSlice,
        product: AllProductSlice.reducer,
    }
});

export default Store;