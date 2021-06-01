import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles';
import { ChangeEvent, useContext, useState } from 'react'
import { PaymentContext } from '../../../../contexts/PaymentContext';

const BankTransfer = () => {
  const payment = useContext(PaymentContext)
  const [nameError, setNameError] = useState("")
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!/^[a-zA-Z]+$/.test(e.target.value)){
      setNameError('Please type in a correct Cardname')
    } else {
      setNameError("")
    }
    payment.addBankName(e)
  }

  const [clearingError, setClearingError] = useState("")
  const handleClearingChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!/^(?:[0-9]{5}|[0-9]{4}-[0-9]{1})$/.test(e.target.value)){
      setClearingError('Please type 12345 or 1234-5')
    } else {
      setClearingError("")
    }
    payment.addClearingNumber(e)
  }

  const [accountError, setAccountError] = useState("")
  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!/^(?:[0-9]{9}|[0-9]{2} [0-9]{3} [0-9]{3}-[0-9]{1})$/.test(e.target.value)){
      setAccountError('Please type 123456789 or 11 222 333-4')
    } else {
      setAccountError("")
    }
    payment.addAccountNumber(e)
  }

    return (
      <div>
        <Accordion>
          <AccordionSummary>
            <strong>Bank Transfer</strong>
          </AccordionSummary>
          <AccordionDetails style={container}>
            <TextField
              margin="normal"
              label="Bank"
              name="bankname"
              variant="outlined"
              required
              InputLabelProps={{ shrink: true }}
              helperText={nameError}
              error={Boolean(nameError)}
              onChange={handleNameChange}
            />
            <TextField
              margin="normal"
              label="Clearing Number"
              name="clearingnumber"
              variant="outlined"
              required
              InputLabelProps={{ shrink: true }}
              helperText={clearingError}
              error={Boolean(clearingError)}
              onChange={handleClearingChange}
            />
            <TextField
              margin="normal"
              label="Account Number"
              name="accountnumber"
              variant="outlined"
              required
              InputLabelProps={{ shrink: true }}
              helperText={accountError}
              error={Boolean(accountError)}
              onChange={handleAccountChange}
            />
          </AccordionDetails>
          <Button onClick={payment.addBankInfo} variant="contained" type="submit" style={btn}>
            Complete Payment
          </Button>
        </Accordion>
      </div>
    );
}

export default BankTransfer

const container: CSSProperties = {
  width: "80%",
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