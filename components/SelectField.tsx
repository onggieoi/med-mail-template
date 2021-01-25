import React from 'react';
import {
  FormControl, InputLabel, Select, makeStyles,
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
  data: any;
  onChange: Function;
  children: any;
}

const SelectField: React.FC<ISelect> = ({
  label, data, onChange, children,
}) => {
  const classes = useStyles();

  const handleOnChange = (e) => {
    e.preventDefault();

    onChange(e.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId={label}
        id="demo-simple-select-outlined"
        value={data}
        onChange={handleOnChange}
        label={label}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default SelectField;
