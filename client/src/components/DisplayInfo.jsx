import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, Card, IconButton, Divider, Fade, Button, CardMedia, CardContent, Container, InputAdornment, TextField, CardActionArea, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { ChannelContext } from '../context/ChannelContext';

//Icons
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    searchbar: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    margin: {
        margin: theme.spacing(2)
    },
    channelsContainer: {
        '&::-webkit-scrollbar': {
            width: '8px',
            background: theme.palette.secondary.light,
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            borderRadius: '8px'
        },
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: '100%',
        overflow: 'auto'
    },
    channelCard: {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '28%',
        height: 345,
        margin: '10px 15px',
        padding: theme.spacing(2),
        borderRadius: '15px',
        backgroundColor: theme.palette.primary.main,
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
    },
    channelThumbnail: {
        minHeight: 200,
        minWidth: '100%',
        borderRadius: '15px'
    },
    channelDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    channelInfoCard: {
        height: 400,
        maxWidth: '95%',
        width: 950,
        display: 'flex',
        borderRadius: '15px',
        position: 'relative',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
    },
    channelInfoThumbnail: {
        minHeight: 370,
        flexBasis: '95%',
        borderRadius: '15px'
    },
    resetButton: {
        height: 25,
        width: 25,
        position: 'absolute',
        top: 10,
        right: 10
,    }
}));

const ChannelInformationCard = ({channel}) => {
    const { error, dispatch } = useContext(ChannelContext);
    const classes = useStyles();
    const channelInfo = channel[0]
    const [followers, setFollowers] = useState(0)

    useEffect(() => {
        const fetchFollowers = async () => {
            const channelID = channelInfo.id
            const followerCount = await axios.get(`https://twitch-mern-app.herokuapp.com/channels/select/${channelID}/followers`);
            setFollowers(followerCount.data.total);
        }
        fetchFollowers()
    }, []);

    const handleReset = () => {
        dispatch({type: "RESET_SEARCH"});
        const fetchFeaturedChannels = async () => {
            try{
                const res = await axios.get("https://twitch-mern-app.herokuapp.com/channels")
                dispatch({type: "LOAD_FEATURED", payload: res.data.data})
            }catch(err){
                console.log(err)
            }
        }
        fetchFeaturedChannels()
    };
    return (
        <Card className={classes.channelInfoCard}>
            <div style={{minWidth:"300px"}}>
                <CardMedia
                    className={classes.channelInfoThumbnail}
                    image={channelInfo.profile_image_url}
                    title="TwitchTv Steamer Thumbnail"
                />  
            </div>
            <Divider orientation="vertical" flexItem/>
            <CardContent>
                <Typography variant="h5" component="h5">
                    {channelInfo.display_name}
                </Typography>
                <Typography variant="body1">
                    Creator Status: {channelInfo.broadcaster_type}
                </Typography>
                <Typography variant="body1">
                    Description: {channelInfo.description}
                </Typography>
                <Typography variant="body1">
                    Started streaming: {channelInfo.created_at}
                </Typography>
                <Typography variant="body1">
                    Followers: {followers}
                </Typography>
                <Typography variant="body1">
                    Subscribers: -
                </Typography>
                <Typography variant="body1">
                    Total View Count: {channelInfo.view_count}
                </Typography>
            </CardContent>
            <IconButton className={classes.resetButton} aria-label="delete" onClick={handleReset}>
                <CancelIcon/>
            </IconButton>
        </Card>
    );
}

export default function DisplayInfo() {
    const classes = useStyles();
    const { channels, activeChannel, error, dispatch } = useContext(ChannelContext);
    const [query, setQuery] = useState('');
    useEffect(() => {
        const fetchFeaturedChannels = async () => {
            try{
                const res = await axios.get("https://twitch-mern-app.herokuapp.com/channels")
                dispatch({type: "LOAD_FEATURED", payload: res.data.data})
            }catch(err){
                console.log(err)
            }
        }
        fetchFeaturedChannels()
    }, [query]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({
            type: "SEARCH_START"
        });
        try {
            const res = await axios.get(`https://twitch-mern-app.herokuapp.com/channels/search/${query}`);
            dispatch({type: "SEARCH_SUCCESS", payload: res.data.data});
        }catch(err){
            console.log(err);
        }
    };

    const handleChannelClick = async (channel) => {
        try {
            const channelID = channel.id;
            const res = await axios.get(`https://twitch-mern-app.herokuapp.com/channels/select/${channelID}`)
            dispatch({type: "SELECT_CHANNEL", payload: res.data.data})
        }catch(err){
            console.log(err);
        }
    };

    return (
        <Container disableGutters={true} className={classes.root}>
            <Box width="100%">
                <form className={classes.searchbar} onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        type="search"
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
                            ),
                        }}
                    />
                    <Button 
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                        Search
                    </Button>
                </form>
            </Box>
            
            <Box className={classes.channelsContainer}>
                {activeChannel 
                ? <ChannelInformationCard channel={activeChannel}/> 
                : channels.length > 0 ? 
                channels[0].map(channel => (
                    <Fade
                        in={true}
                        key={`channel-${channel.id}`}
                    >
                        <Card className={classes.channelCard} >
                            <CardActionArea onClick={() => handleChannelClick(channel)}>
                                <CardMedia
                                        className={classes.channelThumbnail}
                                        image={channel.thumbnail_url}
                                        title="TwitchTv Steamer Thumbnail"
                                />
                                <div className={classes.channelDetails}>
                                    <CardContent>
                                            <Typography gutterBottom variant="h5" component="h5">
                                                <Badge color={channel.is_live ? "error" : "default"} variant="dot">
                                                    {channel.display_name}
                                                </Badge>
                                            </Typography>
                                            <Typography>
                                                {channel.is_live ? `Currently streaming: ${channel.game_name}` : `Last game played: ${channel.game_name}`}
                                            </Typography>
                                    </CardContent>
                                </div>
                            </CardActionArea>
                        </Card>
                    </Fade>
                ))
                : null
                }
            </Box>
        </Container>
    )
};
