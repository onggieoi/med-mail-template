import React from 'react';
import {
  FormControl, InputLabel, Select, makeStyles, Input, Chip,
} from '@material-ui/core';
import { questionsEx } from 'utils/DataSample';

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
  data: any[];
  onChange: Function;
  children: any;
}

const SelectField: React.FC<ISelect> = ({
  label, data, onChange, children,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    onChange(event.target.value);
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
            {
              selected.map((value) => {
                const question = questionsEx.find((ques) => ques.id === value);

                return (
                  <Chip key={value} label={question?.question} className={classes.chip} />
                );
              })}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default SelectField;
