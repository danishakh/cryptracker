import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core'
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';


const useStyles = makeStyles(theme => ({
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center'
    },
    carouselItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        textTransform: 'uppercase',
        color: 'white'
    }
}))

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Carousel = () => {
    const classes = useStyles();
    const [trending, setTrending] = useState([])
    // get currency from our context
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    };

    useEffect(() => {
        fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    // check alice carousel documentation - basically this is how many items to show based on how many pixels are shown
    const responsive = {
        0: {
            items: 2
        }, 
        512: {
            items: 4
        }
    }

    const items = trending.map(coin => {
        // profit will be true if the value is >= 0
        let profit = coin.price_change_percentage_24h >= 0
        
        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height='80'
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                            fontWeight: 500
                        }}
                    >
                        {profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span syle={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}                                          
                </span>
            </Link>
        )
    })

    // console.log(trending);

    return (
        <div className={classes.carousel}>
            <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel
