import react, { Component, createContext } from "react";
import axios from "axios";

interface State {
    userName: string,
    userCity: string,
    userStreet: string,
    userZip: string,
    userPhone: string,
    userEmail: string,
    userPassword: string
}

interface ContextProps extends State {
    fetchUsers: () => void;
    addName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addCity: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addStreet: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addZip: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addPhone: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    registerRequest: (event: React.FormEvent) => void;
}

export const UserAxiosContext = createContext<ContextProps>({ 
    userName: "",
    userCity: "",
    userStreet: "",
    userZip: "",
    userPhone: "",
    userEmail: "",
    userPassword: "",
    fetchUsers: () => {},
    addName: () => {},
    addCity: () => {},
    addStreet: () => {},
    addZip: () => {},
    addPhone: () => {},
    addEmail: () => {},
    addPassword: () => {},
    registerRequest: () => {},
});

class UserAxiosProvider extends Component<{}, State> {

    fetchUsersfromDatabase = async () => {
        const request = await axios.get("/users");
        console.log(request)
    };

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

    handleRegisterRequest = async (event: React.FormEvent) => {
        event.preventDefault();
        const newUser = {
          name: this.state.userName,
          adress: {
              city: this.state.userCity,
              street: this.state.userStreet,
              zip: this.state.userZip,
          },
          phone: this.state.userPhone, 
          email: this.state.userEmail,
          password: this.state.userPassword
        }
        const request = await axios.post("/users/handleRegister", newUser);
        console.log(request.data)
    }

    render() {
        return(
            <UserAxiosContext.Provider
                value={{
                    ...this.state,
                    fetchUsers: this.fetchUsersfromDatabase,
                    addName: this.addNameToState,
                    addCity: this.addCityToState,
                    addStreet: this.addStreetToState,
                    addZip: this.addZipToState,
                    addPhone: this.addPhoneToState,
                    addEmail: this.addEmailToState,
                    addPassword: this.addPasswordToState,
                    registerRequest: this.handleRegisterRequest,
                }}>
                {this.props.children}
            </UserAxiosContext.Provider>
        )
    }
}

export default UserAxiosProvider