import { Component, createContext } from "react";
import axios from "axios";

export interface SessionUser {
    adress: {
        city: string,
        street: string,
        zip: string
    },
    _id: string,
    name: string,
    phone: string,
    email: string,
}

interface State {
    emailLogin: string
    passwordLogin: string
    currentUser: SessionUser
    isLoggedIn: boolean
    loginError: boolean
    errorTxt: string
}

interface ContextProps extends State {
    fetchUsers: () => void;
    handleEmailLogin: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordLogin: (event: React.ChangeEvent<HTMLInputElement>) => void;
    logoutRequest: () => void;
    loginRequest: () => void;
}

export const LoginContext = createContext<ContextProps>({
    emailLogin: "",
    passwordLogin: "",
    currentUser: 
        {
            adress: {
                city: "",
                street: "",
                zip: ""
            },
            _id: "",
            name: "",
            phone: "",
            email: "",
        },
    isLoggedIn: false,
    loginError: false,
    errorTxt: "",
    fetchUsers: () => {},
    handleEmailLogin: () => {},
    handlePasswordLogin: () => {},
    loginRequest: () => {},
    logoutRequest: () => {}
});

class LoginProvider extends Component<{}, State> {

    fetchUsersfromDatabase = async () => {
        await axios.get("/users");
    };

    handleEmailLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ emailLogin: event.target.value })
    };

    handlePasswordLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ passwordLogin: event.target.value })
    };

    handleLoginRequest = async () => {
        try {
            const userLogin = {
                email: this.state.emailLogin,
                password: this.state.passwordLogin
            }
    
            await axios.post("/users/handleLogin", userLogin);
            const response = await axios.get("/users/currentUser")
            const user = response.data
            this.setState({currentUser: user})
            this.setState({ isLoggedIn: true })
            this.setState({ loginError: false })

            console.log(this.state.isLoggedIn)
        } catch (error) {
            this.setState({ loginError: true })   
            this.setState({ errorTxt: error.response.data })
        }
    };

    handleLogoutRequest = async () => {
        try {
            await axios.delete("/users/handleLogout");
            this.setState({ isLoggedIn: false })
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        return(
            <LoginContext.Provider
                value={{
                    ...this.state,
                    fetchUsers: this.fetchUsersfromDatabase,
                    handleEmailLogin: this.handleEmailLoginInput,
                    handlePasswordLogin: this.handlePasswordLoginInput,
                    loginRequest: this.handleLoginRequest,
                    logoutRequest: this.handleLogoutRequest
                }}>
                {this.props.children}
            </LoginContext.Provider>
        )
    }
}

export default LoginProvider