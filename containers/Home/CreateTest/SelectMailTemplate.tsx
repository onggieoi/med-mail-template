import React, { useContext } from 'react';
import { MenuItem } from '@material-ui/core';

import SelectField from 'components/SelectField';
import { MailContext } from 'contexts/MailContext';

type SelectMailTemplateProps = {

};

const SelectMailTemplate: React.FC<SelectMailTemplateProps> = () => {
  const { mailTemplateId, handleChangeTemplate, mailTemplates } = useContext(MailContext);

  return (
    <div className='w-full'>
      <SelectField label='Email Template' data={mailTemplateId} onChange={handleChangeTemplate}
      >
        {
          mailTemplates.map((option) => (
            <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
          ))
        }
      </SelectField>
    </div>
  );
};

export default SelectMailTemplate;
