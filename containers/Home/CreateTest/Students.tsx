import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { Minus, Plus } from 'react-feather';

import Student from 'components/Student';
import { IStudent } from 'interfaces';
import { MailContext } from 'contexts/MailContext';

const Students: React.FC<any> = () => {
  const { students, setStudents } = useContext(MailContext);

  const handleAdd = (e) => {
    e.preventDefault();

    if (students.length === 5) return;

    const student: IStudent = {
      id: students.length + 1, name: '', email: '', deadline: '',
    };

    students.push(student);

    setStudents([...students]);
  };

  const handleMinus = (e) => {
    if (students.length === 1) return;
    e.preventDefault();

    students.pop();

    setStudents([...students]);
  };

  return (
    <div className='flex'>
      <div className='w-11/12 overflow-x-scroll flex gap-5 border border-theme-5 px-3 shadow-md'>
        {
          students.map((student, i) => (
            <Student key={i} student={student} />
          ))
        }
      </div>
      <div className='flex flex-col my-auto gap-5'>
        <div className='w-1/12 ml-3'>
          <div className='mb-5'>
            <Button onClick={handleAdd} style={{ height: '4rem' }}
              variant="contained" color="primary" className=' mb-5'
            >
              <Plus />
            </Button>
          </div>
          <Button onClick={handleMinus}
            variant="contained" color="primary" style={{ background: 'red', height: '4rem' }}
          >
            <Minus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Students;
