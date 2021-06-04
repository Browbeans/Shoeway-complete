import { Component, createContext } from "react";
import { SessionUser } from './loginContext';
import axios from "axios";

interface State {
    name: string,
    city: string,
    street: string,
    zip: string,
    phone: string,
    email: string
}

interface ContextProps extends State {
    handleName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCity: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleStreet: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleZip: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePhone: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
    putRequest: (event: React.FormEvent) => void;
    setUserState: (user: SessionUser) => void;
}

export const UpdateContext = createContext<ContextProps>({ 
    name: "",
    city: "",
    street: "",
    zip: "",
    phone: "",
    email: "",
    setUserState: () => {},
    handleName: () => {},
    handleCity: () => {},
    handleStreet: () => {},
    handleZip: () => {},
    handlePhone: () => {},
    handleEmail: () => {},
    putRequest: () => {}
});

class UpdateProvider extends Component<{}, State> {

    handleSetUsersState = (user: SessionUser) => {
        this.setState({ 
            name: user.name,
            city: user.adress.city,
            street: user.adress.street,
            zip: user.adress.zip,
            phone: user.phone,
            email: user.email
        })
    }

    handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: event.target.value })
    }

    handleCityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ city: event.target.value })
    }

    handleStreetInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ street: event.target.value })
    }

    handleZipInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ zip: event.target.value })
    }

    handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ phone: event.target.value })
    }

    handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: event.target.value })
    }

    handlePutRequest = async () => {
        const updatedUser = {
            name: this.state.name,
            adress: {
                city: this.state.city,
                street: this.state.street,
                zip: this.state.zip
            },
            phone: this.state.phone,
            email: this.state.email
        }
        try {
            await axios({
                method: "put",
                url: `/users/handleUpdate`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: updatedUser,
                });
            
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return(
            <UpdateContext.Provider
                value={{
                    ...this.state,
                    handleName: this.handleNameInput,
                    handleCity: this.handleCityInput,
                    handleStreet: this.handleStreetInput,
                    handleZip: this.handleZipInput,
                    handlePhone: this.handlePhoneInput,
                    handleEmail: this.handleEmailInput,
                    putRequest: this.handlePutRequest,
                    setUserState: this.handleSetUsersState
                }}>
                {this.props.children}
            </UpdateContext.Provider>
        )
    }
}

export default UpdateProvider