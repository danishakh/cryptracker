import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';

const CoinTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const history = useNavigate();

    const { currency, symbol } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));

        setCoins(data)
        setLoading(false)
    }

    console.log(coins);

    useEffect(() => {
        fetchCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            type: 'dark'
        }
    });

    const handleSearch = () => {
        return coins.filter((coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search));
    }

    const useStyles = makeStyles(() => ({
        row: {
            backgroundColor: '#16171a',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#131111',
                fontFamily: 'Mulish'
            }
        },
        pagination: {
            '& .MuiPaginationItem-root': {
                color: 'gold'
            }
        }
    }));

    const classes = useStyles()


    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: 'center' }}>
                <Typography
                    variant='h4'
                    style={{ margin: 18, fontFamily: 'Mulish' }}
                >
                    Crypto Prices by Market Cap
                </Typography>
                <TextField 
                    label='Search for a Cryptocurrency...'
                    variant='outlined'
                    style={{ marginBottom: 20, width: '100%' }}
                    onChange={e => setSearch(e.target.value)}
                />
                <TableContainer>
                    { loading ? (
                            <LinearProgress style={{ backgroundColor: 'gold' }} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                                    <TableRow>
                                        {['Coin', 'Price', 'Price Change(24h)', 'Market Cap', 'Total Circulating Supply'].map(header => (
                                            <TableCell
                                                style={{
                                                    color: 'black',
                                                    fontWeight: '700',
                                                    fontFamily: 'Mulish'
                                                }}
                                                key={header}
                                                align={header === 'Coin' ? 'inherit' : 'right'}
                                            >
                                                {header}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {handleSearch()
                                        .slice((page-1) * 10, (page-1) * 10 + 10)   // just show me the first 10 indeces
                                        .map(row => {
                                        const profit = row.price_change_percentage_24h > 0;

                                        return (
                                            <TableRow
                                                onClick={() => history(`/coins/${row.id}`)}
                                                className={classes.row}
                                                key={row.name}
                                            >
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                    style={{
                                                        display: 'flex',
                                                        gap: 15
                                                    }}
                                                >
                                                    <img 
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height='50'
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span
                                                            style={{textTransform: 'uppercase', fontSize: 23}}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{ color: 'darkgrey' }}>{row.name}</span>
                                                    </div>
                                                </TableCell>

                                                <TableCell align='right'>
                                                    {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>

                                                <TableCell 
                                                    align='right'
                                                    style={{
                                                        color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {profit && '+'}{row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                
                                                <TableCell 
                                                    align='right'
                                                >
                                                    {symbol}{numberWithCommas(row.market_cap.toString())}
                                                </TableCell>

                                                <TableCell align='right'>
                                                    {numberWithCommas(row.circulating_supply.toFixed(3))} {row.symbol.toString().toUpperCase()}
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination 
                    style={{
                        padding: 20,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    count={(handleSearch()?.length / 10)}    // should be the length of the array returned by handleSearch / 10
                    classes={{ ul: classes.pagination }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinTable