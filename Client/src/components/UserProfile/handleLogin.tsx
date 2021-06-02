import { ChangeEvent, CSSProperties, useContext} from 'react';
import { Button, TextField } from "@material-ui/core";
import { LoginContext } from '../../contexts/User/loginContext';
import '../../style/Entry.css'
import { Link } from 'react-router-dom';

function HandleLogin() {
    const { handleEmailLogin, handlePasswordLogin, loginRequest, isLoggedIn, loginError, errorTxt } = useContext(LoginContext);
    //const userContext = useContext(UserContext)
    // const history = useHistory()

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
        handleEmailLogin(e);
    }

    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
        handlePasswordLogin(e);
    }

    const handleClick = () => {
        loginRequest()
    }

    return(
        <div>
            <h2 className="entry-title">Login</h2>
            <form action="/">
                <TextField
                    className="form-inputs"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    id="email"
                    type="email"
                    label="Email Adress"
                    name="email"
                    key="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleEmailInput}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    id="password"
                    type="password"
                    label="password"
                    name="password"
                    key="password"
                    autoComplete="password"
                    autoFocus
                    onChange={handlePasswordInput}
                />
                {loginError 
                ?
                <p style={{ color: "red" }}>{errorTxt}</p>
                :
                <></>
                }
                {/* {isLoggedIn ? "/user-profile" : "/entry"} */}
                {window.location.pathname === '/checkout' ?
                    <Button
                        onClick={handleClick}
                        style={btn}
                        variant="contained"
                        >
                        Login
                    </Button>
                :
                    <Link to={isLoggedIn ? "/user-profile" : "/entry"} style={{ textDecoration: "none", width: "100%" }}>
                        <Button
                            onClick={handleClick}
                            style={btn}
                            variant="contained"
                            >
                            Login
                        </Button>
                    </Link>
                }
            </form>
        </div>
    );
}

const btn: CSSProperties = {
    alignSelf: "center",
    borderRadius: ".5rem",
    outline: "none",
    fontSize: "1rem",
    background: "#56EAC6",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    width: '100%',
    margin: "1rem 0rem"
  };

export default HandleLogin