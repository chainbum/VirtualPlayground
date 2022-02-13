import React from 'react';

const Wallet = (props) => {
    const { currentAccount, setCurrentAccount } = props;
    
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

        } catch(err) {
            console.log(err);
        }
    };

    return <div align='right'>
        {
            currentAccount.length > 0 
            ? 'Connected!'
            : <button onClick={connectWallet}>Connect</button>
        }
    </div>
}

export default Wallet;