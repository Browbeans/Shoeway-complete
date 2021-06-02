import { Component, createContext } from "react";
import axios from "axios";

interface State {
    userName: string,
    userCity: string,
    userStreet: string,
    userZip: string,
    userPhone: string,
    userEmail: string,
    userPassword: string,
    role: string,
    pending: boolean,
    registerError: boolean,
    errorTxt: string,
    registerSuccess: boolean
}

interface ContextProps extends State {
    addName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addCity: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addStreet: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addZip: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addPhone: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addPending: (event: React.ChangeEvent<HTMLInputElement>) => void;
    registerRequest: (event: React.FormEvent) => void;
}

export const RegisterContext = createContext<ContextProps>({ 
    userName: "",
    userCity: "",
    userStreet: "",
    userZip: "",
    userPhone: "",
    userEmail: "",
    userPassword: "",
    role: "",
    pending: false,
    registerError: false,
    errorTxt: "",
    registerSuccess: false,
    addName: () => {},
    addCity: () => {},
    addStreet: () => {},
    addZip: () => {},
    addPhone: () => {},
    addEmail: () => {},
    addPassword: () => {},
    addPending: () => {},
    registerRequest: () => {}
});

class RegisterProvider extends Component<{}, State> {
    state: any = {
        role: "customer"
    }

    

    addNameToState = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ userName: event.target.value })
    };

    addCityToState = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ userCity: event.target.value });
    };

    addStreetToState = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ userStreet: event.target.value });
    };

    addZipToState = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ userZip: event.target.value });
    };

    addPhoneToState = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ userPhone: event.target.value });
    };

    addEmailToState = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ userEmail: event.target.value });
    };

    addPasswordToState = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ userPassword: event.target.value });
    };

    addPendingToState = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            this.setState({ role: "pending" })
        } else {
            this.setState({ role: "customer" })
        } 
    }
    
    handleRegisterRequest = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const newUser = {
                name: this.state.userName,
                adress: {
                    city: this.state.userCity,
                    street: this.state.userStreet,
                    zip: this.state.userZip,
                },
                phone: this.state.userPhone, 
                email: this.state.userEmail,
                password: this.state.userPassword,
                role: this.state.role

              }
              const request = await axios.post("/users/handleRegister", newUser);
              console.log(request)
              console.log(newUser)
              this.setState({ registerSuccess: true })
        } catch (error) {
            this.setState({ registerError: true })
            this.setState({ errorTxt: error.response.data })
        }
    };

    render() {
        return(
            <RegisterContext.Provider
                value={{
                    ...this.state,
                    role: this.state.role,
                    addName: this.addNameToState,
                    addCity: this.addCityToState,
                    addStreet: this.addStreetToState,
                    addZip: this.addZipToState,
                    addPhone: this.addPhoneToState,
                    addEmail: this.addEmailToState,
                    addPassword: this.addPasswordToState,
                    addPending: this.addPendingToState,
                    registerRequest: this.handleRegisterRequest
                }}>
                {this.props.children}
            </RegisterContext.Provider>
        )
    }
}

export default RegisterProvider