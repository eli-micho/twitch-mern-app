import { makeStyles } from '@material-ui/core/styles';
import { Container, Box } from '@material-ui/core';
import Sidebar from './components/Sidebar';
import DisplayInfo from './components/DisplayInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.secondary,
    display: 'flex',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: `calc(100% - 300px)`,

    height: '100%'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <Container 
      className={classes.root}
      disableGutters={true}
    >
      <Sidebar/>
      <Box className={classes.main}>
        <DisplayInfo/>
      </Box>
      
    </Container>
  );
}

export default App;
