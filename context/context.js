import { createContext, useState, useEffect } from "react";


// export for every class and component using

export const CoinMarketCapContext = createContext();
export const CoinMarketProvider = ({children}) =>{


    const getTopTenCoin = async () =>{
        try {
            const res = await fetch('/api/getTopCoin')
            const data = await res.json();
            return data.data.data // return an object with second data is a key, third data is we want to access the data inside that object too

        } catch (error) {
            console.log(error.message);
        }
    }

    const getRecentlyAdded = async () =>{
        try {
            const res = await fetch('/api/getRecentlyAdded')
            const data = await res.json();
            return data.data.data;

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <CoinMarketCapContext.Provider value={{getTopTenCoin, getRecentlyAdded}}>
            {children}
        
        
        
        </CoinMarketCapContext.Provider>
    )

}