import { makeStyles } from '@mui/styles';

// Define and export custom styles for components using Material-UI
export default makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  toolbar: {
    height: '70px',
  },
  content: {
    flexGrow: '1',
    padding: '32px',
    width: '100%',
  },
}));
