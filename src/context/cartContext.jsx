import { createContext, useState, useEffect} from "react";
import { getStorage, saveStorage } from "../utils/localStorage";



const CartContext = createContext();

const CartContextProvider = (props) => {
    const [cart, setCart] = useState([]);

    const addProductToCart = (product) => {
        const existsIndex = cart.findIndex(prod => prod.id === product.id)

        if(existsIndex === -1){
            product.cantidad =1;
            setCart([...cart, product]);
        }else{
            if(Number(product.stock) === cart[existsIndex].cantidad){
                return;
            }

            const copyCart = [...cart]
            copyCart[existsIndex].cantidad++;
            setCart(copyCart)
           
            
        }        
    }

    const totalCart = cart.reduce((acc, prod) => acc + prod.cantidad, 0)

    useEffect(() => {
        const storageCart = getStorage('cart');
        if(storageCart){
            setCart(storageCart)

        }

    },[])

    useEffect(() => {
        if(cart.length > 0){
            saveStorage('cart', cart);
        }
    },[cart])

    return <CartContext.Provider value={{ cart, addProductToCart, totalCart }}>

        {props.children}
    </CartContext.Provider>

}


export { CartContext, CartContextProvider}