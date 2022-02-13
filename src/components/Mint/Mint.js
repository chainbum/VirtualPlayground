import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import WebTimeFolks from '../../utils/WebTimeFolks.json'
import consts from '../../consts';
import MintWhiteList from './MintWhiteList';
import MintPublic from './MintPublic';

import './Mint.scss';

const Mint = (props) => {
    const { currentAccount } = props;

    const [isWhiteListSaleActive, setIsWhiteListSaleActive] = useState(false);
    const [isPublicSaleActive, setIsPublicSaleActive] = useState(false);

    const getIsWhiteListSaleActive = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedSmartContract = new ethers.Contract(consts.CONTRACT_ADDRESS, WebTimeFolks.abi, signer);

                const response = await connectedSmartContract.getIsWhiteListSaleActive();
                setIsWhiteListSaleActive(response);

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getIsPublicSaleActive = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedSmartContract = new ethers.Contract(consts.CONTRACT_ADDRESS, WebTimeFolks.abi, signer);

                const response = await connectedSmartContract.getIsPublicSaleActive();
                setIsPublicSaleActive(response);

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getIsWhiteListSaleActive();
        getIsPublicSaleActive();
    }, [currentAccount]);

    return <div className='mintcointainer'>
        {
            isWhiteListSaleActive
            ? <MintWhiteList currentAccount={currentAccount} />
            : isPublicSaleActive
            ? <MintPublic currentAccount={currentAccount} />
            : 'Sale Is Not Active Yet'
        }
    </div>
}

export default Mint;