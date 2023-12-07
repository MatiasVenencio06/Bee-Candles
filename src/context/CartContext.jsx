import { createContext, useContext, useState } from "react";

export const CartContext = createContext()

export function useCartContext() {
    const { cartCounter, setCartCounter } = useContext(CartContext) 

    function AddToCart(item, cantidad) {
        const isExistent = cartCounter.find((finded) => finded.id === item.id)
        if (isExistent) {
            if (cantidad === 1) {
                isExistent.cantidad = isExistent.cantidad + 1
                setCartCounter([...cartCounter, isExistent])
                setCartCounter(cartCounter)
            } else {
                isExistent.cantidad = isExistent.cantidad + cantidad
                setCartCounter([...cartCounter, isExistent])
                setCartCounter(cartCounter)
            }
        } else {
            setCartCounter([...cartCounter, {...item, cantidad}])
        }
    }
    
    function RemoveFromCart(item) {
        const forRemive = cartCounter.find((finded) => finded.id === item.id)
        if (forRemive.cantidad > 1) {
            forRemive.cantidad = forRemive.cantidad - 1
        } else {
            DeleteProduct(item)
        }
    }

    function DeleteProduct(item) {
        const updatedCart = cartCounter.filter((filtered, i) => filtered.id !== item.id)
        setCartCounter(updatedCart)
      }

    const total = () => {
        let total = 0
        cartCounter.forEach(item => {
            total += item.precio * item.cantidad
        });
        return total
      }
    
    const totalProducts = () => {
        let total = 0
        cartCounter.forEach(item => {
            total += item.cantidad
        });
        return total
    }
    
    return {AddToCart, setCartCounter, cartCounter, total, RemoveFromCart, DeleteProduct, totalProducts}
}

export function CartProvider({children}) {
    const [cartCounter, setCartCounter] = useState([])


    return (
        <CartContext.Provider value={{cartCounter, setCartCounter}}>
            {children}
        </CartContext.Provider>
    )
}