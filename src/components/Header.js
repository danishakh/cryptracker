import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Mulish",
        fontWeight: "bold",
        cursor: "pointer"
    }
}));

const Header = () => {
    const classes = useStyles()
    const history = useNavigate();

    const { currency, setCurrency } = CryptoState()

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
            type: 'dark'
        }
    })

    console.log(currency)

    return (    
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography 
                            className={classes.title}
                            onClick={()=> history("/")}
                            variant="h5"
                        >
                            CrypTracker
                        </Typography>
                        <Select 
                            variant='outlined' 
                            style={{width: 100, height: 40, marginRight: 15}}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}    
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header
