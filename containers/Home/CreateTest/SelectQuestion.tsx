import React, { useContext } from 'react';
import { MenuItem, useTheme } from '@material-ui/core';

import MultiSelectField from 'components/MultiSelectField';
import { MailContext } from 'contexts/MailContext';

import { questionsEx } from 'utils/DataSample';

const getStyles = (current, choosen, theme) => ({
  fontWeight:
    choosen.indexOf(current) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
});

const SelectMailTemplate: React.FC<any> = () => {
  const theme = useTheme();

  const { questionIds, handleChangeQuestion } = useContext(MailContext);

  return (
    <MultiSelectField label='Question' data={questionIds} onChange={handleChangeQuestion}
    >
      {
        questionsEx.map(({ id, question }) => (
          <MenuItem key={id} value={id} style={getStyles(id, questionIds, theme)}>
            {question}
          </MenuItem>
        ))
      }
    </MultiSelectField>
  );
};

export default SelectMailTemplate;
