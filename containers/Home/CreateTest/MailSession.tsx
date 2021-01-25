import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import { MailContext } from 'contexts/MailContext';
import { ProgressContext } from 'contexts/ProgressContext';

import EditorField from 'components/Editor';

type MailProps = {
  isShow: boolean;
  onClose: Function;
};

const MailSession: React.FC<MailProps> = ({ isShow, onClose }) => {
  const {
    preview, handleSaveMailTemplate, mailTemplateId, mailTemplates,
  } = useContext(MailContext);
  const { onLoading, doneLoading } = useContext(ProgressContext);

  const [title, setTitle] = useState('');

  useEffect(() => {
    const crtTemplateName = mailTemplates.find((temp) => temp.id === mailTemplateId)?.name;

    if (crtTemplateName) {
      setTitle(crtTemplateName);
    } else {
      setTitle('');
    }
  }, [mailTemplateId]);

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const onSave = () => {
    onLoading();
    setTimeout(() => {
      handleSaveMailTemplate(title);
      doneLoading();
    }, 500);
  };

  if (!isShow) return null;

  return (
    <div className='bg-white shadow-md p-5 col-span-2 xl:col-span-1'>
      <p className='text-center text-theme-3 text-lg font-bold border-b-2 border-theme-2 mb-3'>
        Add Email Template
      </p>
      <div className='mb-3'>
        <TextField label="Title" value={title} onChange={handleTitleChange} />
      </div>
      <div className='grid grid-cols-3 gap-2'>
        <div className='col-span-3 lg:col-span-2'>
          <EditorField />
        </div>
        <div className='col-span-3 lg:col-span-1 border border-theme-5 p-3'>
          <div className='text-theme-3 border-b border-theme-5 font-bold mb-3'>
            Use this components to personalize
          </div>
          <div>$NAME$ - Student&#39;s name</div>
          <div>$EMAIL$ - Student&#39;s email</div>
          <div>$DEADLINE$ - Student&#39;s deadline</div>
          <div>$QUESTION$ - List questions</div>
        </div>
      </div>

      <div className='border-theme-2 mt-5'>
        <div className='flex'>
          <p className='text-center text-theme-3 text-lg font-bold'>Your Email will look like this</p>
        </div>
        <div className='p-3 border-2 overflow-y-scroll'>
          <div dangerouslySetInnerHTML={{ __html: preview }} />
        </div>
      </div>

      <div className='flex mt-5'>
        <div className='ml-auto'>
          <Button color="primary" onClick={() => onClose()} >Cancel</Button>
          <Button onClick={onSave}
            variant="contained" color="primary" style={{ marginLeft: '1rem' }}
          >
            Save
          </Button>
        </div>
      </div>
    </div >
  );
};

export default MailSession;
