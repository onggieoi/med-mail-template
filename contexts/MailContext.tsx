import { convertToHTML } from 'draft-convert';
import { ContentState, EditorState } from 'draft-js';
import React, { createContext, useEffect, useState } from 'react';

import { IQuestion, IStudent } from 'interfaces';

interface IMailContext {
  editorState: EditorState;
  setEditorState: Function;
  preview: EditorState;
  subject: string;
  setSubject: Function;
  questions: IQuestion[];
  setQuestion: Function;
  students: IStudent[];
  setStudents: Function;
  mailTemplate: string;
  setTemplate: Function;
  dataHtml: string;
}

export const MailContext = createContext({} as IMailContext);

export const MailProvider = ({ children }) => {
  const [subject, setSubject] = useState('');
  const [questions, setQuestion] = useState([] as IQuestion[]);
  const [students, setStudents] = useState([
    {
      id: 1, name: '', email: '', deadline: '',
    },
  ] as IStudent[]);
  const [dataHtml, setHtml] = useState('' as any);

  const [mailTemplate, setTemplate] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [preview, setPriview] = useState(EditorState.createEmpty());

  useEffect(() => {
    setHtml(convertToHTML(editorState.getCurrentContent() as any));
    setPriview(editorState);
  }, [editorState]);

  useEffect(() => {
    setEditorState(EditorState.createWithContent(ContentState.createFromText(mailTemplate)));
  }, [mailTemplate]);

  return (
    <MailContext.Provider
      value={{
        editorState,
        setEditorState,
        preview,
        subject,
        setSubject,
        questions,
        setQuestion,
        students,
        setStudents,
        mailTemplate,
        setTemplate,
        dataHtml,
      }}
    >
      { children}
    </MailContext.Provider>
  );
};
