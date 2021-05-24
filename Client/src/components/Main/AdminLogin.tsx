import React from 'react'
import {
    Button,
    TextField,
  } from "@material-ui/core";
  import { CSSProperties } from '@material-ui/styles';

const AdimnLogin =()=>{
    return(
        <div className="modal-container">
        <h2>Login</h2>
        <form className="form">
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="password"
            label="Password"
            type="password"
            autoComplete="email"
          />
          <Button type="submit" variant="contained" style={btn}>
            login
          </Button>
        </form>
        </div>
    )
}

const btn: CSSProperties = {
    alignSelf: "center",
    bordeeRadius: "3rem",
    outline: "none",
    fontSize: "1.2rem",
    background: "#56EAC6",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    margin: "1rem",
  };
export default AdimnLogin