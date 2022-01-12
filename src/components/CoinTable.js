import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';

const CoinTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currency } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));

        setCoins(data)
        setLoading(false)
    }

    console.log(coins);

    useEffect(() => {
        fetchCoins()
    }, [currency])


    return (
        <div>
            
        </div>
    )
}

export default CoinTable