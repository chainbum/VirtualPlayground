import React, { useEffect, useState } from 'react';
import Mint from './components/Mint/Mint';
import Wallet from './components/Wallet/Wallet';
import ohshit from './static/ohshit_final.gif';

import './App.scss';

const App = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    
    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log('Make sure you have MetaMask!');
            return;
        }

        const chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log("Connected to chain " + chainId);
        const rinkebyChainId = "0x4";

        if (chainId !== rinkebyChainId) {
            console.log("You are not connected to the Rinkeby Test Network!");
            return;
        }

        console.log("We have the ethereum object", ethereum);
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log('found authorized account:', account);
            setCurrentAccount(account);

        } else {
            console.log("No authorized account found")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <div className='container'>
            <div className='container__header'>
                <Wallet
                  currentAccount={currentAccount}
                  setCurrentAccount={setCurrentAccount} 
                />
            </div>
            <div className='container__body'>
                <div className='container__body-title'>
                    <img src={ohshit} alt="WTF" />
                </div>
                {currentAccount.length > 0 && (
                    <Mint currentAccount={currentAccount} />
                )}
            </div>
            <div className='container__footer'>
            </div>
        </div>
    );
}

export default App;
