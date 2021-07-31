import {useState} from 'react';
import axios from 'axios';
import api from '../api/api';
import { Input, InputAdornment, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

//Icons
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    margin: {
        margin: theme.spacing(2)
    }
}));

export default function Searchbar() {
    const classes = useStyles();
    const [query, setQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await api.get(`https://api.twitch.tv/helix/search/channels?query=?${query}`)
            console.log(result.data)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.margin} 
                label="Find a channel" 
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    )
                }}
            />
            <Input type="submit" value="Submit"/>
        </form>
    )
}
