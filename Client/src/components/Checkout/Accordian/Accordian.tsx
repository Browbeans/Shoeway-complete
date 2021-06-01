import DelivaryDetails from './DelivaryDetails';
import PaymentDetails from './PaymentDetails';
import { Button, Step, StepLabel, Stepper } from '@material-ui/core';
import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { UserContext } from '../../../contexts/UserContext';
import { PaymentContext } from '../../../contexts/PaymentContext';
import { CartContext } from '../../../contexts/CartContext';
import Deliver from './DeliveryDetails/Deliver';

const muiTheme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        color: "grey",
        "&$active": {
          color: "#56EAC6",
        },
        "&$completed": {
          color: "#56EAC6",
        },
      },
    },
  },
});

  function getSteps(){
    return [ <DelivaryDetails/>, <PaymentDetails/>];
  }

  function getStepContent(stepIndex: number){
    switch (stepIndex) {
      case 0: 
        return <Deliver/>;
      case 1: 
        return <PaymentDetails/>; 
      default:
        return 'unknown step'; 
    }
  }
const Accordian = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps();
  const value = useContext(UserContext)
  const payment = useContext(PaymentContext)
  const cart = useContext(CartContext)

  const callBackClick = () => {
    nextStep() 
    value.filledState(false)
  }

  const nextStep = () => {
    if(activeStep < 1) {
      setActiveStep((currentStep) => currentStep + 1)
      value.shopStateFalse()
    }
    else if(activeStep < 2){
      if(cart.cart.length > 0 ) {
        value.shopStateTrue()
      }
    }
  }

  const previousStep = () => {
    if(activeStep !== -1)
      setActiveStep((currentStep) => currentStep - 1)
      value.shopStateFalse()
  }

    return (
      <MuiThemeProvider theme={muiTheme}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step>
              <StepLabel />
            </Step>
          ))}
        </Stepper>

        <div style={{width: '100%'}}>
          {activeStep === steps.length ? (
            <div>
              <Typography>All Steps are completed</Typography>
            </div>
          ) : (
            <div style={{width: '100%'}}>
              <Typography>{getStepContent(activeStep)}</Typography>
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button disabled={activeStep === 0} onClick={previousStep}>
            Back
          </Button>
          {value.isFilled || payment.isFilled ? 
            <Button
              style={{
                background: "#56EAC6",
                fontWeight: "bold",
                width: "10rem",
                height: "3rem",
              }}
              variant="contained"
              color="primary"
              onClick={callBackClick}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
            : 
            <Button
              style={{
                background: "gray",
                fontWeight: "bold",
                width: "10rem",
                height: "3rem",
              }}
              variant="contained"
              color="primary"
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          }
        </div>
      </MuiThemeProvider>
    );
}

export default Accordian


