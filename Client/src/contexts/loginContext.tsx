import { Component, createContext } from "react";
import axios from "axios";

interface SessionUser {
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
    fetchUsers: () => {},
    handleEmailLogin: () => {},
    handlePasswordLogin: () => {},
    loginRequest: () => {},
    logoutRequest: () => {}
});

class LoginProvider extends Component<{}, State> {

    fetchUsersfromDatabase = async () => {
        const request = await axios.get("/users");
        console.log(request.data)
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
            const request = await axios.get("/users/currentUser")
            const user = request.data
            this.setState({currentUser: user})
            this.setState({ isLoggedIn: true })
        } catch (error) {
            console.log(error)   
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