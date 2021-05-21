import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import '../../style/Startpage.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
      padding: '1.5rem 2.5rem',
      borderRadius: '3rem',
      outline: 'none',
      fontSize: '1.7rem',
      background: '#56EAC6',
      color: '#fff',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      zIndex: 1,
      [theme.breakpoints.down('md')]: {
        padding: "1.1rem 2rem",
        fontSize: '1.3rem',
      },
      [theme.breakpoints.down('sm')]: {
        padding: "0.8rem 1.7rem",
        fontSize: '1rem',
      },
    },
  }),
);


function Startpage() {
    const classes = useStyles();

    return (
      <div className="start-container">
        <h1 className="start-title">
          Welcome to&nbsp;
          <span>ShoeWay</span>
        </h1>
        <p className="sub-title">
          Quality shoes to <span className="match" >match</span> your style
        </p>
        <Link to="/products" style={{ textDecoration: "none", zIndex: 1 }}>
          <Button variant="contained" className={classes.root}>
            Go Shopping
          </Button>
        </Link>
      </div>
    );
}

export default Startpage
