import { ChangeEvent, CSSProperties, useContext, useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { LoginContext } from "../../contexts/User/loginContext";
import { UpdateContext } from '../../contexts/User/updateContext';

function UpdateUserForm() {
    const [nameError, setNameError] = useState("");
    const [cityError, setCityError] = useState("");
    const [streetError, setStreetError] = useState("");
    const [zipError, setZipError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
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
        if (!/^[a-öA-Ö\s,'-]+$/.test(e.target.value)) {
            setNameError("Name is not valid");
          } else {
            setNameError("")
          }
        handleName(e)
    }

    const handleCityInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/^[a-öA-Ö\s,'-]+$/.test(e.target.value)) {
            setCityError("Street is not valid");
          } else {
            setCityError("")
          }
        handleCity(e)
    }

    const handleStreetInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/^[a-öA-Ö0-9\s,'-]*$/.test(e.target.value)) {
            setStreetError("Street is not valid");
          } else {
            setStreetError("")
          }
        handleStreet(e)
    }

    const handleZipInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/^\d{5}$/.test(e.target.value)) {
            setZipError("Street is not valid");
          } else {
            setZipError("")
          }
        handleZip(e)
    }

    const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/^\d{10}$/.test(e.target.value)) {
            setPhoneError("Phone number is not valid");
        } else {
            setPhoneError("")
        }
        handlePhone(e)
    }

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)) {
            setEmailError("Email is not valid");
          } else {
            setEmailError("")
          }
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
                helperText={nameError}
                error={Boolean(nameError)}
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
                helperText={cityError}
                error={Boolean(cityError)}
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
                helperText={streetError}
                error={Boolean(streetError)}
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
                helperText={zipError}
                error={Boolean(zipError)}
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
                helperText={phoneError}
                error={Boolean(phoneError)}
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
                helperText={emailError}
                error={Boolean(emailError)}
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