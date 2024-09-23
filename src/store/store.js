import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cart-slice"


const store = configureStore({
    reducer: {
        cart: cartReducer
    }
})
export { store }