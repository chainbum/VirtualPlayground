import React, { useState } from 'react';
import { ethers } from 'ethers';
import consts from '../../consts';
import WebTimeFolks from '../../utils/WebTimeFolks.json'

import './Mint.scss';


const MintPublic = (props) => {
    const { currentAccount } = props;

    const maxMintAmountPerTransaction = 5;
    const [mintAmount, setMintAmount] = useState(maxMintAmountPerTransaction);
    const [loading, setLoading] = useState(false);
    const [debug, setDebug] = useState('');
    const PRICE = 0.12;

    const mint = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedSmartContract = new ethers.Contract(consts.CONTRACT_ADDRESS, WebTimeFolks.abi, signer);
                const value = PRICE * mintAmount;
                const options = {value: ethers.utils.parseEther(value.toString())}

                const txn = await connectedSmartContract.mintPublic(mintAmount, options);
                setLoading(true);
                await txn.wait();
                setLoading(false);
                setDebug(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`);

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log(err)
            setLoading(false);
            setDebug('Error: ' + JSON.stringify(err?.reason));
        }
    };

    const decrementCount = () => {
        let currAmount = mintAmount - 1;
        if (currAmount < 1) {
            currAmount = 1
        }
        setMintAmount(currAmount);
    };

    const incrementCount = () => {
        let currAmount = mintAmount + 1;
        if (currAmount > maxMintAmountPerTransaction) {
            currAmount = maxMintAmountPerTransaction
        }
        setMintAmount(currAmount);
    };


    return <div>
        <h3>Public Mint</h3>
        <p>{`Number Available to Mint Per Transaction: ${maxMintAmountPerTransaction}`}</p>
        {maxMintAmountPerTransaction > 0 && (
            <div>
                <div>
                    <button onClick={decrementCount}>decrement</button>
                    {mintAmount}
                    <button onClick={incrementCount}>increment</button>
                </div>
                <div>
                    <button onClick={mint}>{`Mint ${mintAmount} folks`}</button>
                    {
                        loading
                        ? 'loading ...'
                        : ''
                    }
                </div>
                <div>
                    {
                        debug
                        ? debug
                        : ''
                    }
                </div>
            </div>
        )}
    </div>
}

export default MintPublic;