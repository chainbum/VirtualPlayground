import React, { useState } from 'react';

import './Mint.scss';

const MintPublic = (props) => {
    const { currentAccount } = props;

    const [numAvailableToMint, setNumAvailableToMint] = useState(5);

    return <div>
        <h3>{`Number Available to Mint: ${numAvailableToMint}`}</h3>
    </div>
}

export default MintPublic;