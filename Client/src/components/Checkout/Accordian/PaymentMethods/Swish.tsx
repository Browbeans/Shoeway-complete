import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles';
import { ChangeEvent, useContext, useState } from 'react'
import { PaymentContext } from '../../../../contexts/PaymentContext';

const Swish = () => {
  const payment = useContext(PaymentContext)
  const [swishError, setSwishError] = useState("");
  const handleSwishChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^(?:[0-9]{10}|[0-9]{4}-[0-9]{4} [0-9]{2})$/.test(e.target.value)) {
      setSwishError("Please type 0701111111 or 0701-1111 11");
    } else {
      setSwishError("")
    }
    payment.addSwish(e)
  }

    return (
      <div style={{margin: '1rem 0rem'}}>
        <Accordion>
          <AccordionSummary>
            <strong>Swish</strong>
          </AccordionSummary>
          <AccordionDetails style={container}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              autoFocus
              helperText={swishError}
              error={Boolean(swishError)}
              onChange={handleSwishChange}
            />
          </AccordionDetails>
          <Button onClick={payment.addCompleteSwish} variant="contained" type="submit" style={btn}>
            Sign with bankId
          </Button>
        </Accordion>
      </div>
    );
}

const container: CSSProperties = {
  width: "20rem",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
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
  margin: "1rem",
  padding: "1rem",
};

export default Swish