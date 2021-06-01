import React, { useContext, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { ProductContext } from '../../../contexts/ProductContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row'
    },
    formControl: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    },
  }),
);

export default function CheckboxesGroup() {
  const classes = useStyles();
  const { getCategories } = useContext(ProductContext)
  const [categories, setCategory] = useState<String[]>([])
  const [state, setState] = React.useState({
    mens: false,
    unisex: false,
    womens: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if(event.target.checked) {
        categories.push(event.target.name) 
        getCategories(categories)
    }else{
        var index = categories.indexOf(event.target.name)
        if(index !== -1) {
            categories.splice(index, 1)
            getCategories(categories)
        }
    }
  };

  const { mens, unisex, womens } = state;
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Category</FormLabel>
        <div>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox checked={mens} onChange={handleChange} name="mens" />
              }
              label="Mens"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={unisex}
                  onChange={handleChange}
                  name="unisex"
                />
              }
              label="Unisex"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={womens}
                  onChange={handleChange}
                  name="womens"
                />
              }
              label="Womens"
            />
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </div>
      </FormControl>
    </div>
  );
}