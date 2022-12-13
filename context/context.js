import { createContext, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useMoralisQuery } from "react-moralis";

import {ShibaABI, LinkABI,AXSABI,USDCABI, ShibaAddress, LinkAddress, AXSAddress,USDCAddress} from '../constants/constant'
// export for every class and component using

export const CoinMarketCapContext = createContext();
export const CoinMarketProvider = ({children}) =>{

    const {isAuthenticated, user,Moralis} =useMoralis();

    const {
        data:coins,
        error,
        isLoading: loadingCoins,
    } = useMoralisQuery('Coin');

    const [currentAccount, setCurrentAccount] = useState('');
    const [openBuyCryptoModal, setOpenBuyCryptoModal] = useState();
    const [fromToken,setFromToken] = useState('ETH');
    const [toToken, setToToken] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(()=>{
        if(isAuthenticated){
            const accounts = user.get('ethAddress');
            setCurrentAccount(accounts);
        }
    },[isAuthenticated]) // allow this to run once when isAuthenticated changed


    const getContractAddress = () =>{
        if(fromToken === 'Shiba') return ShibaAddress
        if(fromToken ==='Link') return LinkAddress
        if(fromToken==='AXS') return AXSAddress
        if(fromToken ==='USDC') return USDCAddress
    }

    const getToAddress = () =>{
        if(toToken==='Shiba') return ShibaAddress
        if(toToken==='Link') return LinkAddress
        if(toToken==='AXS') return AXSAddress
        if(toToken==='USDC') return USDCAddress
    }
    const getToABI = () =>{
        if(toToken==='Shiba') return ShibaABI
        if(toToken==='Link') return LinkABI
        if(toToken==='AXS') return AXSABI
        if(toToken==='USDC') return USDCABI
    }

    const openModal = () =>{
        setOpenBuyCryptoModal(true)
    }
    const executeSwap = async () =>{
        try {
            if(fromToken === 'ETH'){
                if(!isAuthenticated)return
                await Moralis.enableWeb3();
                const contractAddress = getToAddress();
                const abi = getToABI();

                let options = {
                    contractAddress: contractAddress,
                    functionName: "mint",
                    abi: abi,
                    params:{
                        to: currentAccount,
                        amount: Moralis.Units.Token(amount)
                    }
                }
                sendETH();
                const transaction = await Moralis.executeFunction(options);
                const receipt = transaction.wait(3);
                console.log(receipt);
            }
            else{
                swapToken();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTopTenCoin = async () =>{
        try {
            const res = await fetch('/api/getTopCoin')
            const data = await res.json();
            return data.data.data // return an object with second data is a key, third data is we want to access the data inside that object too

        } catch (error) {
            console.log(error.message);
        }
    }

    const sendETH = async ()=>{
        if(!isAuthenticated) return
        const contractAddress = getToAddress();

        let options = {
            type:'native',
            amount: Moralis.Units.ETH('0.01'),
            receiver: contractAddress,
        }
        const transaction = await Moralis.transfer(options);
        const receipt = await transaction.wait();
        console.log(receipt);
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

    const swapToken = async() =>{
        try {
            if(!isAuthenticated)return
            await Moralis.enableWeb3();

            if(fromToken === toToken) return alert('You cannot swap the same token')

            const fromOptions ={
                type:'erc20',
                amount: Moralis.Units.Token(amount, '18'),
                receiver: getContractAddress(),
                contractAddress: getContractAddress(),

            }
            const toMintOptions = {
                contractAddress: getToAddress(),
                functionName:'mint',
                abi: getToABI(),
                params:{
                    to:currentAccount,
                    amount: Moralis.Units.Token(amount,'18')
                }
            }
            let fromTransaction = await Moralis.transfer(fromOptions);
            let toMintTransaction = await Moralis.executeFunction(toMintOptions);
            let fromReceipt = await fromTransaction.wait()
            let toReceipt = await toMintTransaction.wait();

            console.log(fromReceipt);
            console.log(toReceipt);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CoinMarketCapContext.Provider 
        value={{
            getTopTenCoin, 
            openBuyCryptoModal,
            setOpenBuyCryptoModal,
            fromToken,
            toToken,
            setFromToken,
            setToToken,
            amount,
            setAmount,
            executeSwap,
            openModal,
            coins,
            loadingCoins
        
        }}>
            {children}
        
        
        
        </CoinMarketCapContext.Provider>
    )

}
