import { ChangeEvent, CSSProperties, useContext, useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { LoginContext } from "../../contexts/User/loginContext";
import { UpdateContext } from '../../contexts/User/updateContext';

function UpdateUserForm() {
    const { currentUser } = useContext(LoginContext);
    const { 
        handleName, 
        handleCity, 
        handleStreet, 
        handleZip, 
        handlePhone, 
        handleEmail, 
        setUserState, 
        putRequest, 
        name, city, street, zip, phone, email } = useContext(UpdateContext);

    useEffect(() => {
        setUserState(currentUser)
    }, [currentUser, setUserState]);

    const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        handleName(e)
    }

    const handleCityInput = (e: ChangeEvent<HTMLInputElement>) => {
        handleCity(e)
    }

    const handleStreetInput = (e: ChangeEvent<HTMLInputElement>) => {
        handleStreet(e)
    }

    const handleZipInput = (e: ChangeEvent<HTMLInputElement>) => {
        handleZip(e)
    }

    const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
        handlePhone(e)
    }

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
        handleEmail(e)
    }

    return(
        <form>
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                id="name"
                label="Name"
                name="name"
                key="name"
                type="text"
                value={name}
                onChange={handleNameInput}
                // helperText={nameError}
                // error={Boolean(nameError)}
            />
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                id="city"
                label="City"
                name="city"
                key="city"
                type="text"
                autoComplete="city"
                value={city}
                onChange={handleCityInput}
                // helperText={cityError}
                // error={Boolean(cityError)}
            />
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                id="street"
                label="street"
                name="street"
                key="street"
                type="text"
                autoComplete="street"
                autoFocus
                value={street}
                onChange={handleStreetInput}
                // helperText={streetError}
                //     error={Boolean(streetError)}
                />
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                id="zip"
                label="zip"
                name="zip"
                key="zip"
                type="number"
                autoComplete="zip"
                autoFocus
                value={zip}
                onChange={handleZipInput}
                // helperText={zipError}
                // error={Boolean(zipError)}
            />
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                id="phone"
                type="tel"
                label="Phone"
                name="phone"
                key="phone"
                autoComplete="phone"
                autoFocus
                value={phone}
                onChange={handlePhoneInput}
                // helperText={phoneError}
                // error={Boolean(phoneError)}
            />
            <TextField
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
                value={email}
                onChange={handleEmailInput}
                // helperText={emailError}
                // error={Boolean(emailError)}
            />
            <Button
                style={btn}
                variant="contained"
                onClick={putRequest}
            >
                Save
            </Button>
        </form>
    );
}

const btn: CSSProperties = { 
    alignSelf: "center",
    borderRadius: ".5rem",
    outline: "none",
    fontSize: "0.9rem",
    background: "#56EAC6",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

export default UpdateUserForm