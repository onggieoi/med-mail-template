import React, {
  createContext, useEffect, useState,
} from 'react';
import { convertToHTML } from 'draft-convert';
import { ContentState, EditorState, convertFromHTML } from 'draft-js';

import { IEmailTemplate, IStudent } from 'interfaces';

import { mailTemplateEx, questionsEx } from 'utils/DataSample';

interface IMailContext {
  editorState: EditorState;
  setEditorState: Function;
  handleSaveMailTemplate: Function;
  preview: string;
  subject: string;
  setSubject: Function;
  questionIds: number[];
  handleChangeQuestion: Function;
  students: IStudent[];
  setStudents: Function;
  mailTemplateId: number;
  handleChangeTemplate: Function;
  dataHtml: string;
  mailTemplates: IEmailTemplate[];
  submit: Function;
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
  const [dataHtml, setHtml] = useState('');

  const [preview, setPreview] = useState('');
  const [mailTemplates, setMailTemplates] = useState(mailTemplateEx);
  const [mailTemplateId, setTemplate] = useState(-1);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const formatHtml = (student: IStudent) => {
    const questionChoosens = questionsEx.filter((ques) => questionIds.includes(ques.id));

    let data = dataHtml;
    data = data.replace('$NAME$', `${student.name}`);
    data = data.replace('$EMAIL$', `${student.email}`);
    data = data.replace('$DEADLINE$', `${student.deadline}`);
    data = data.replace('$QUESTION$', `<ul>
    ${questionChoosens.map((ques) => (`
      <li>${ques.question}</li>
    `)).join('')}
    </ul>`);

    return data;
  };

  useEffect(() => {
    setHtml(convertToHTML(editorState.getCurrentContent() as any) as any);
    setPreview(formatHtml(students[0]));
  }, [editorState]);

  useEffect(() => {
    const choosenTemplate = mailTemplates.find((template) => template.id === mailTemplateId) as any;

    setEditorState(() => {
      if (choosenTemplate?.id) {
        const blocksFromHTML = convertFromHTML(choosenTemplate?.template) as any;
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap,
        );

        return EditorState.createWithContent(state);
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

  const handleSaveMailTemplate = (name: string) => {
    const crtTemplateIndex = mailTemplates.findIndex((template) => template.id === mailTemplateId);

    if (crtTemplateIndex !== -1) {
      mailTemplates[crtTemplateIndex] = {
        id: mailTemplateId,
        name,
        template: dataHtml,
      };

      setMailTemplates([...mailTemplates]);
    } else {
      const newTemplate: IEmailTemplate = {
        id: mailTemplates.length + 1,
        name: '',
        template: dataHtml,
      };

      mailTemplates.push(newTemplate);

      setMailTemplates([...mailTemplates]);
      setTemplate(newTemplate.id);
    }
  };

  const submit = async (student: IStudent) => {
    const result = await fetch('/api/mail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: student.email,
        subject,
        dataHtml: formatHtml(student),
      }),
    });

    const { isDone } = await result.json();

    return isDone;
  };

  return (
    <MailContext.Provider
      value={{
        editorState,
        setEditorState,
        handleSaveMailTemplate,
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
        mailTemplates,
        submit,
      }}
    >
      { children}
    </MailContext.Provider>
  );
};
