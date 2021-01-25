import React, { useContext } from 'react';
import { Editor } from 'draft-js';
import { Button } from '@material-ui/core';

import { MailContext } from 'contexts/MailContext';

import EditorField from 'components/Editor';

type MailProps = {
  isShow: boolean;
  onClose: Function;
};

const MailSession: React.FC<MailProps> = ({ isShow, onClose }) => {
  const { preview } = useContext(MailContext);

  if (!isShow) return null;

  return (
    <div className='bg-white shadow-md p-5 col-span-2 xl:col-span-1'>
      <p className='text-center text-theme-3 text-lg font-bold border-b-2 border-theme-2 mb-3'>
        Add Email Template
          </p>
      <EditorField />

      <div className='border-theme-2 mt-5'>
        <p className='text-center text-theme-3 text-lg font-bold'>Your Email will look like this</p>
        <div className='p-3 border-2'>
          <Editor
            readOnly={true}
            editorState={preview}
            onChange={() => { }}
          />
        </div>
      </div>

      <div className='flex mt-5'>
        <div className='ml-auto'>
          <Button color="primary" onClick={() => onClose()} >Cancel</Button>
          <Button variant="contained" color="primary" style={{ marginLeft: '1rem' }}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default MailSession;
