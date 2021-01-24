import React from 'react';
import {
  FormControl, InputLabel, Select, makeStyles, MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface ISelect {
  label: string;
  options: any[];
  data: any;
  setData: Function;
}

const SelectField: React.FC<ISelect> = ({
  label, options, data, setData,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div className='mt-5 w-full'>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          id="demo-simple-select-outlined"
          value={data}
          onChange={handleChange}
          label={label}
        >
          {
            options.map((option) => (
              <MenuItem key={option.id} value={option.template}>{option?.template}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectField;
