import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, IconButton } from '@material-ui/core';

//Icons
import LiveTvIcon from '@material-ui/icons/LiveTv';
import Brightness6Icon from '@material-ui/icons/Brightness6';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        alignItems: 'center',
        width: '100%',
        maxWidth: drawerWidth,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.light,
        borderTopLeftRadius: '25px',
        borderBottomLeftRadius: '20px'
    },
    darkModeBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        color: theme.palette.primary.light
    }
}));

export default function Sidebar() {
    const classes = useStyles();

    return (
        <Box
            className={classes.root} 
            variant="permanent"
        >
            <Typography
                variant="h4"
            >
                <LiveTvIcon/> Streamer.Info
            </Typography>

            <Box className={classes.darkModeBox}>
                <IconButton color="primary" aria-label="dark mode toggle">
                    <Brightness6Icon/>
                </IconButton>
            </Box>

            <Typography
                variant="body1"
            >
                Coded by Elijah Micho. &reg; {new Date().getFullYear()}
            </Typography>
        </Box>
        
    )
}
