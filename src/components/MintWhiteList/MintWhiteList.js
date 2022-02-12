import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import WebTimeFolks from '../../utils/WebTimeFolks.json'
import consts from '../../consts';

const MintWhiteList = (props) => {
    const { currentAccount } = props;
    const [numAvailableToMint, setNumAvailableToMint] = useState(0);
    const [mintAmount, setMintAmount] = useState(0);
    const PRICE = 0.08;

    const getNumAvailableToMint = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedSmartContract = new ethers.Contract(consts.CONTRACT_ADDRESS, WebTimeFolks.abi, signer);

                const amount = await connectedSmartContract.numAvailableToMint(currentAccount);
                setNumAvailableToMint(amount);

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log(err)
        }
    };

    const mint = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedSmartContract = new ethers.Contract(consts.CONTRACT_ADDRESS, WebTimeFolks.abi, signer);

                const txn = await connectedSmartContract.mintWhiteList(PRICE, mintAmount);

                await txn.wait();
                
                console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`);

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log(err)
        }
    };

    const decrement = () => {
        let currAmount = mintAmount - 1;
        if (currAmount < 0) {
            currAmount = 0
        }
        setMintAmount(currAmount);
    };

    const increment = () => {
        let currAmount = mintAmount + 1;
        if (currAmount > numAvailableToMint) {
            currAmount = numAvailableToMint
        }
        setMintAmount(currAmount);
    };

    useEffect(() => {
        getNumAvailableToMint();
    }, [currentAccount]);

    return <div>
        <div>
            <h3>{`Number Available to Mint: ${numAvailableToMint}`}</h3>
        </div>
        <div>
            <button onClick={decrement}>decrement</button>
            {mintAmount}
            <button onClick={increment}>increment</button>
        </div>
        <div>
            <button onClick={mint}>{`Mint ${mintAmount} folks`}</button>
        </div>
    </div>
}

export default MintWhiteList;