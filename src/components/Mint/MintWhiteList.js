import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import consts from '../../consts';
import WebTimeFolks from '../../utils/WebTimeFolks.json';
import lightspeed from '../../static/light_speed.gif';

import './Mint.scss';


const MintWhiteList = (props) => {
    const { currentAccount } = props;

    const [maxMintAmount, setMaxMintAmount] = useState(0);
    const [mintAmount, setMintAmount] = useState();
    const [loading, setLoading] = useState(false);
    const [debug, setDebug] = useState('');
    const PRICE = 0.08;

    const mint = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedSmartContract = new ethers.Contract(consts.CONTRACT_ADDRESS, WebTimeFolks.abi, signer);
                const value = PRICE * mintAmount;
                const options = { value: ethers.utils.parseEther(value.toString()) }

                const txn = await connectedSmartContract.mintWhiteList(mintAmount, options);
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
        if (currAmount > maxMintAmount) {
            currAmount = maxMintAmount
        }
        setMintAmount(currAmount);
    };

    useEffect(() => {
        const getNumAvailableToMint = async () => {
            try {
                const { ethereum } = window;

                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const connectedSmartContract = new ethers.Contract(consts.CONTRACT_ADDRESS, WebTimeFolks.abi, signer);

                    const amount = await connectedSmartContract.getNumAvailableToMint(currentAccount);
                    setMaxMintAmount(amount);

                } else {
                    console.log("Ethereum object doesn't exist!");
                }
            } catch (err) {
                console.log(err)
            }
        };
        getNumAvailableToMint();
    }, [loading, currentAccount]);

    useEffect(() => {
        setMintAmount(maxMintAmount);
    }, [maxMintAmount]);

    return <div>
        <h3>WhiteList Mint</h3>
        <p>{`Number Available to Mint: ${maxMintAmount}`}</p>
        {maxMintAmount > 0 && (
            loading === true ? (
                <div>
                    <img src={lightspeed} alt="lightspeed" />
                </div>
            ) : (
                <div>
                    <div>
                        <button onClick={decrementCount}>decrement</button>
                        {mintAmount}
                        <button onClick={incrementCount}>increment</button>
                    </div>
                    <div>
                        <button onClick={mint}>{`Mint ${mintAmount} folks`}</button>
                    </div>
                    <div>
                        {
                            debug
                                ? debug
                                : ''
                        }
                    </div>
                </div>
            )
        )}
    </div>
}

export default MintWhiteList;