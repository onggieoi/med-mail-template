import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Plus, Users } from 'react-feather';

import TestSession from 'containers/Home/CreateTest';

const Home = () => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      setOpen(true);
    }, 500);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='flex justify-items-center items-center'>
        <Users />
        <div className='ml-3'>Cadidate Management</div>
      </div>

      <div className='my-3'>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Add New Test <Plus />
        </Button>
      </div>

      <TestSession isShow={isOpen} onClose={handleClose} />
    </>
  );
};

export default Home;
