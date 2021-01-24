import React from 'react';
import {
  FormControl, InputLabel, Select, MenuItem, makeStyles, useTheme, Input, Chip,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
    minWidth: 120,
    margin: '1rem 0',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
    width: '100%',
  },
}));

const getStyles = (name, personName, theme) => ({
  fontWeight:
    personName.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
      width: 250,
    },
  },
};

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
  const theme = useTheme();

  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select multiple label={label}
        value={data}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected: any) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {options.map((val) => (
          <MenuItem key={val.id} value={val?.id} style={getStyles(val.id, data, theme)}>
            {val?.question}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
