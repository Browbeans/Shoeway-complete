import React, { ChangeEvent, Component, useContext, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CSSProperties } from "@material-ui/styles";
import { UserContext } from '../../../contexts/UserContext'

const PersonalDetails = () => {
  const user = useContext(UserContext)
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [adressError, setAdressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [zipError, setZipError] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^[a-öA-Ö\s,'-]+$/.test(e.target.value)) {
      setNameError("Name is not valid");
    } else {
      setNameError("")
    }
    user.addName(e);
  }

  const handleAdressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^[a-öA-Ö0-9\s,'-]*$/.test(e.target.value)) {
      setAdressError("Adress is not valid");
    } else {
      setAdressError("")
    }
    user.addAdress(e);
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^\d{10}$/.test(e.target.value)) {
      setPhoneError("Phone number is not valid");
    } else {
      setPhoneError("")
    }
    user.addPhone(e);
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("")
    }
    user.addEmail(e);
  }

  const handleZipChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^\d{5}$/.test(e.target.value)) {
      setZipError("Zip code is not valid");
    } else {
      setZipError("")
    }
    user.addZip(e);
  }

    return (
      <div>
        <Accordion style={form}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Personal Details
          </AccordionSummary>
          <AccordionDetails style={form}>
            <div style={{ display: "flex" }}>
              <div style={textfieldsDiv}>
              <TextField
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
                onChange={handleNameChange}
                helperText={nameError}
                error={Boolean(nameError)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="adress"
                key="adress"
                label="Address"
                name="address"
                type="text"
                autoComplete="address"
                autoFocus
                onChange={handleAdressChange}
                helperText={adressError}
                error={Boolean(adressError)}
              />
              <TextField
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
                onChange={handlePhoneChange}
                helperText={phoneError}
                error={Boolean(phoneError)}
              />
              </div>
              <div style={textfieldsDiv}>
              <TextField
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
                onChange={handleEmailChange}
                helperText={emailError}
                error={Boolean(emailError)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="zip"
                label="zip"
                name="zip"
                type="number"
                autoComplete="zip"
                autoFocus
                onChange={handleZipChange}
                helperText={zipError}
                error={Boolean(zipError)}
              />
              </div>
            </div>
            <Button
              type='submit'
              onClick={user.addToObject}
              style={btn}
              variant="contained"
            >
              Add
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>
    );
}

const textfieldsDiv: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  margin: "0.5rem"

}

const form: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "1rem",
  background: "lightgrey",
  fontSize: "1.2rem",
};

const btn: CSSProperties = {
  alignSelf: "center",
  bordeeRadius: "3rem",
  outline: "none",
  fontSize: "1rem",
  background: "#56EAC6",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
  padding: "1rem",
};

export default PersonalDetails