import React, { useContext, useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

import { IStudent } from 'interfaces';
import { MailContext } from 'contexts/MailContext';

type StudentProps = {
  student: IStudent;
};

const Student: React.FC<StudentProps> = ({ student }) => {
  const { students, setStudents } = useContext(MailContext);
  const [state, setState] = useState(student);

  const handleChangeName = (e) => {
    setState({
      ...state,
      name: e.target.value,
    });
  };

  const handleChangeEmail = (e) => {
    setState({
      ...state,
      email: e.target.value,
    });
  };

  const handleChangeDeadLine = (e) => {
    setState({
      ...state,
      deadline: e.target.value,
    });
  };

  useEffect(() => {
    const indexCurrentStudent = students.findIndex((std) => std.id === student.id);
    students[indexCurrentStudent] = state;

    setStudents([...students]);
  }, [state]);

  return (
    <div className='border-2 border-theme-3 p-3 my-3' style={ { minWidth: '400px', width: '500px' } }>
      <TextField label="Name" className='w-full' value={ state.name } onChange={ handleChangeName } />
      <TextField label="Email" className='w-full' style={ { margin: '1rem 0' } } value={ state.email } onChange={ handleChangeEmail } />
      <TextField label="Deadline" className='w-full' value={ state.deadline } onChange={ handleChangeDeadLine } />
    </div>
  );
};

export default Student;
