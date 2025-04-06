import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

// Define and export custom styles for components using Material-UI
export default makeStyles((theme) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '240px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      paddingRight: '0 !important',
      flexWrap: 'wrap',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: '0',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  linkButton: {
    '&hover': {
      color: 'white !important',
      textDecoration: 'none',
    },
  },
}));
