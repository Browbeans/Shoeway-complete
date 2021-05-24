import { Button, TextField } from "@material-ui/core";
import React, { ChangeEvent, CSSProperties, useContext, useState } from "react";
import react from "react";
import { UserAxiosContext } from "../../../contexts/userAxiosContext";

function HandleRegister() {

    const userContext = useContext(UserAxiosContext);
    const [nameError, setNameError] = useState("");
    const [cityError, setCityError] = useState("");
    const [streetError, setStreetError] = useState("");
    const [zipError, setZipError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    // console.log(userContext.users);

    const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/^[a-öA-Ö\s,'-]+$/.test(e.target.value)) {
            setNameError("Name is not valid");
          } else {
            setNameError("")
          }
        userContext.addName(e);
    }

    const handleCityInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/^[a-öA-Ö\s,'-]+$/.test(e.target.value)) {
            setCityError("Street is not valid");
          } else {
            setCityError("")
          }
        userContext.addCity(e)
    }

    const handleStreetInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/^[a-öA-Ö0-9\s,'-]*$/.test(e.target.value)) {
            setStreetError("Street is not valid");
          } else {
            setStreetError("")
          }
        userContext.addStreet(e)
    }

    const handleZipInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/^\d{5}$/.test(e.target.value)) {
            setZipError("Street is not valid");
          } else {
            setZipError("")
          }
        userContext.addZip(e)
    }
    
    const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/^\d{10}$/.test(e.target.value)) {
            setPhoneError("Phone number is not valid");
        } else {
            setPhoneError("")
        }
        userContext.addPhone(e)
    }

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)) {
            setEmailError("Email is not valid");
          } else {
            setEmailError("")
          }
        userContext.addEmail(e)
    }

    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
        // funkar ej
        // if (!/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*)(?=.{8,}).*$/.test(e.target.value)) {
        //     setPasswordError("Password must be eight characters or longer");
        //   } else {
        //     setPasswordError("")
        //   }
        userContext.addPassword(e)
    }

    return(
        <div>
            <h2>Register</h2>
            <form action="/">
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
                    autoComplete="name"
                    autoFocus
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
                    autoFocus
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
                    onChange={handleEmailInput}
                    helperText={emailError}
                    error={Boolean(emailError)}
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
                    helperText={passwordError}
                    error={Boolean(passwordError)}
                />
                <Button
                    onClick={userContext.registerRequest}
                    style={btn}
                    variant="contained"
                    >
                    Register
                </Button>
            </form>
        </div>
    )
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
  padding: "1rem",
  width: '10rem',
  margin: "1rem 0rem"
};

export default HandleRegister