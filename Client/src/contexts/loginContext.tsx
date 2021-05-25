import { Component, createContext } from "react";
import axios from "axios";

interface State {
    emailLogin: string
    passwordLogin: string
}

interface ContextProps extends State {
    fetchUsers: () => void;
    handleEmailLogin: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordLogin: (event: React.ChangeEvent<HTMLInputElement>) => void;
    loginRequest: (event: React.FormEvent) => void;
}

export const LoginContext = createContext<ContextProps>({
    emailLogin: "",
    passwordLogin: "",
    fetchUsers: () => {},
    handleEmailLogin: () => {},
    handlePasswordLogin: () => {},
    loginRequest: () => {}
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
            // console.log(request)
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
                    loginRequest: this.handleLoginRequest
                }}>
                {this.props.children}
            </LoginContext.Provider>
        )
    }
}

export default LoginProvider