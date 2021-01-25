import { convertToHTML } from 'draft-convert';
import { ContentState, EditorState } from 'draft-js';
import React, { createContext, useEffect, useState } from 'react';

import { IStudent } from 'interfaces';

import { mailTemplateEx } from 'utils/DataSample';

interface IMailContext {
  editorState: EditorState;
  setEditorState: Function;
  preview: EditorState;
  subject: string;
  setSubject: Function;
  questionIds: number[];
  handleChangeQuestion: Function;
  students: IStudent[];
  setStudents: Function;
  mailTemplateId: number;
  handleChangeTemplate: Function;
  dataHtml: string;
}

export const MailContext = createContext({} as IMailContext);

export const MailProvider = ({ children }) => {
  const [subject, setSubject] = useState('');
  const [questionIds, setQuestion] = useState([] as number[]);
  const [students, setStudents] = useState([
    {
      id: 1, name: '', email: '', deadline: '',
    },
  ] as IStudent[]);
  const [dataHtml, setHtml] = useState('' as any);

  const [mailTemplateId, setTemplate] = useState(-1);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [preview, setPriview] = useState(EditorState.createEmpty());

  useEffect(() => {
    setHtml(convertToHTML(editorState.getCurrentContent() as any));
    setPriview(editorState);
  }, [editorState]);

  useEffect(() => {
    const choosenTemplate = mailTemplateEx.find((templateEx) => templateEx.id === mailTemplateId);

    setEditorState(() => {
      if (choosenTemplate?.id) {
        return EditorState.createWithContent(ContentState.createFromText(choosenTemplate?.template));
      }

      return EditorState.createWithContent(ContentState.createFromText(''));
    });
  }, [mailTemplateId]);

  const handleChangeTemplate = (val) => {
    setTemplate(val);
  };

  const handleChangeQuestion = (val) => {
    setQuestion(val);
  };

  return (
    <MailContext.Provider
      value={{
        editorState,
        setEditorState,
        preview,
        subject,
        setSubject,
        questionIds,
        handleChangeQuestion,
        students,
        setStudents,
        mailTemplateId,
        handleChangeTemplate,
        dataHtml,
      }}
    >
      { children}
    </MailContext.Provider>
  );
};
