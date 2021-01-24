import React, { useContext } from 'react';
import {
  Button, TextField,
} from '@material-ui/core';
import { Plus, Users } from 'react-feather';
import { Editor } from 'draft-js';

import { MailContext } from 'contexts/MailContext';

import MultiSelectField from 'components/MultiSelectField';
import Students from 'containers/Home/Students';
import SelectField from 'components/SelectField';
import EditorField from 'components/Editor';

import { mailTemplateEx, questionsEx } from 'utils/DataSample';

const Home = () => {
  const {
    preview, subject, setSubject, questions, setQuestion, mailTemplate, setTemplate,
  } = useContext(MailContext);

  return (
    <>
      <div className='flex justify-items-center items-center'>
        <Users />
        <div className='ml-3'>Cadidate Management</div>
      </div>

      <div className='my-3'>
        <Button variant="contained" color="primary">
          Add New Test <Plus />
        </Button>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        {/* Create Test */}
        <div className='bg-white shadow-md px-5 py-10 col-span-2 xl:col-span-1'>
          <TextField label="Subject" className='w-full'
            value={subject} onChange={(e) => setSubject(e.target.value)}

          />
          <MultiSelectField label='Question' options={questionsEx} data={questions} setData={setQuestion} />
          <Students />
          <SelectField label='Email Template' options={mailTemplateEx} data={mailTemplate} setData={setTemplate} />

          <div className='flex mt-5'>
            <div className='ml-auto'>
              <Button color="primary">Cancel</Button>
              <Button variant="contained" color="primary" className='ml-5'>Invite</Button>
            </div>
          </div>
        </div>

        {/* Mail */}
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
              <Button color="primary">Cancel</Button>
              <Button variant="contained" color="primary" className='ml-5'>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
