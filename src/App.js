import React, { useEffect, useState } from 'react';
import MintWhiteList from './components/MintWhiteList/MintWhiteList';

import './App.scss';

const App = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    
    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;

        console.log(ethereum)

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

            // setupEventListener();
        } else {
            console.log("No authorized account found")
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert('Get MetaMask!');
                return;
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log('Connected:', accounts[0]);
            setCurrentAccount(accounts[0]);
            
            // setupEventListener();
            return alert('Account connected!');
        } catch(err) {
            console.log(err);

        }
    };

    const renderNotConnectedContainer = () => (
        <div>
            <button onClick={connectWallet}>connect wallet</button> <br />
        </div>
    );

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <div className='container'>
            <div className='container__header'>
            </div>
            <div className='container__body'>
                {currentAccount === "" ? (
                        renderNotConnectedContainer()
                    ) : (
                        <MintWhiteList currentAccount={currentAccount} />
                )}
            </div>
            <div className='container__footer'>
            </div>
        </div>
    );
}

export default App;
