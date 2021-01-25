import React, { useContext } from 'react';
import { MenuItem } from '@material-ui/core';

import SelectField from 'components/SelectField';
import { MailContext } from 'contexts/MailContext';

import { mailTemplateEx } from 'utils/DataSample';

type SelectMailTemplateProps = {

};

const SelectMailTemplate: React.FC<SelectMailTemplateProps> = () => {
  const { mailTemplateId, handleChangeTemplate } = useContext(MailContext);

  return (
    <div className='w-full'>
      <SelectField label='Email Template' data={mailTemplateId} onChange={handleChangeTemplate}
      >
        {
          mailTemplateEx.map((option) => (
            <MenuItem key={option.id} value={option.id}>{option.template}</MenuItem>
          ))
        }
      </SelectField>
    </div>
  );
};

export default SelectMailTemplate;
