import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { MailContext } from 'contexts/MailContext';
import { ProgressContext } from 'contexts/ProgressContext';

import SelectQuestion from 'containers/Home/CreateTest/SelectQuestion';
import Students from 'containers/Home/CreateTest/Students';
import SelectMailTemplate from 'containers/Home/CreateTest/SelectMailTemplate';
import MailSession from 'containers/Home/CreateTest/MailSession';

type AlertType = {
  isOpen: boolean;
  type: 'error' | 'success' | 'info' | 'warning' | undefined;
  msg: string;
};

type TestSessionProps = {
  isShow: boolean;
  onClose: Function;
};

const TestSession: React.FC<TestSessionProps> = ({ isShow, onClose }) => {
  const {
    subject, setSubject, mailTemplateId, submit, students, handleChangeTemplate,
  } = useContext(MailContext);
  const { onLoading, doneLoading } = useContext(ProgressContext);

  const [openMailSession, setMailSession] = useState(false);

  const [alert, setAlert] = useState({ isOpen: false, type: undefined, msg: '' } as AlertType);

  const handleAlert = (type: 'error' | 'success' | 'info' | 'warning', msg: string) => {
    setAlert({ isOpen: true, type, msg });
  };

  const handleCloseAlert = () => {
    setAlert({ isOpen: false, type: undefined, msg: '' });
  };

  const handleCloseMailSession = () => {
    setMailSession(false);
  };

  const handleOpenMailTemplate = () => {
    setMailSession(true);
  };

  const createNewMailTemplate = () => {
    handleChangeTemplate(-1);
    handleOpenMailTemplate();
  };

  const handleInvite = () => {
    onLoading();

    students.map(async (student) => {
      const isDone = await submit(student);
      if (isDone) {
        handleAlert('success', `Send mail successful to ${student.name}`);
      } else {
        handleAlert('error', `something wrong with ${student.name}'s mail`);
      }
    });

    doneLoading();
  };

  useEffect(() => {
    if (mailTemplateId !== -1) handleOpenMailTemplate();
  }, [mailTemplateId]);

  if (!isShow) return null;

  return (
    <div className='grid grid-cols-2 gap-4'>
      {/* Create Test */}
      <div className='bg-white shadow-md px-5 py-10 col-span-2 xl:col-span-1'>
        <TextField label="Subject" className='w-full'
          value={subject} onChange={(e) => setSubject(e.target.value)}
        />
        <SelectQuestion />
        <Students />

        <div className='flex mt-5'>
          <div className='ml-auto'>
            <Button variant="contained" color="primary" className='ml-5'
              onClick={createNewMailTemplate}
            >
              Create New Mail Template
            </Button>
          </div>
        </div>
        <SelectMailTemplate />

        <div className='flex mt-5'>
          <div className='ml-auto'>
            <Button color="primary" onClick={() => onClose()} >Cancel</Button>
            <Button variant="contained" color="primary" style={{ marginLeft: '1rem' }}
              onClick={handleInvite}
            >
              Invite
            </Button>
          </div>
        </div>
        <Snackbar open={alert.isOpen} autoHideDuration={3000} onClose={handleCloseAlert}>
          <Alert severity={alert.type}>
            {alert.msg}
          </Alert>
        </Snackbar>
      </div>

      {/* Mail */}
      <MailSession isShow={openMailSession} onClose={handleCloseMailSession} />
    </div >
  );
};

export default TestSession;
