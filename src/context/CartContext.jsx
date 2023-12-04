import { createContext, useState } from "react";

export const CartContext = createContext()

export function CartProvider({children}) {
    const [cartCounter, setCartCounter] = useState([])
    return (
        <CartContext.Provider value={{cartCounter, setCartCounter}}>
            {children}
        </CartContext.Provider>
    )
}