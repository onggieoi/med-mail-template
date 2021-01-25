import React, { useContext } from 'react';
import { CircularProgress, LinearProgress } from '@material-ui/core';

import { ProgressContext } from 'contexts/ProgressContext';

const Progress = () => {
  const { loading } = useContext(ProgressContext);

  if (!loading) return null;

  return (
    <div className='w-full absolute top-0 left-0 h-2' style={{ zIndex: 10000 }}>
      <LinearProgress />
      <div className='flex mt-3 mr-3'>
        <div className='ml-auto'>
          <CircularProgress />
        </div>
      </div>
    </div>
  );
};

export default Progress;
