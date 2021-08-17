import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  
  menuOptions: {
    display: 'flex',
    flex: 2,
    justifyContent: 'space-evenly'
  },

  headerOptions: {
    display: "flex",
    flex: 2,
    justifyContent: "space-around"
  },
  
  heading: {
    color: '#fd0202',
    fontFamily: 'Yanone Kaffeesatz',
    fontWeight: '900',
    fontSize: '2.7em',
    textDecoration: 'none',
  },
  fistIcon: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px',
  },
  menuRight: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1
    },
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));