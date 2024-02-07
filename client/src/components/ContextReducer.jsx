import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) =>{
    switch(action.type){
        case "ADD":
            return [...state, {id:action.id, name:action.name, qty:action.qty, size:action.size, price:action.price, img:action.img}];
        case "REMOVE":
            let temp = [...state];
            temp.splice(action.index, 1);
            return temp;
        case "UPDATE":
            let arr = [...state];
            arr.find((food, index)=>{
                if(food.id === action.id && food.size == action.size){
                    arr[index] = {...food, qty:parseInt(action.qty) + parseInt(food.qty), price:parseInt(action.price) + parseInt(food.price)}
                }
            });
            return arr;
        case "DROP":
            let tmp = [];
            return tmp;
        default:
            console.log("Error in Reducer");
    }
};

export const CartProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {
                    children
                }
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = ()=>useContext(CartStateContext);
export const useDispatchCart = ()=>useContext(CartDispatchContext);