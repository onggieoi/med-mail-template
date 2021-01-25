import React, { useContext } from 'react';
import {
  EditorState, RichUtils, Editor, getDefaultKeyBinding, KeyBindingUtil,
} from 'draft-js';

import { MailContext } from 'contexts/MailContext';

const { hasCommandModifier } = KeyBindingUtil;

const EditorComponent: React.FC<any> = () => {
  const { editorState, setEditorState } = useContext(MailContext);

  const onHandleChange = (state: EditorState) => {
    setEditorState(state);
  };

  const onUnderlineClick = () => {
    onHandleChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onBoldClick = () => {
    onHandleChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    onHandleChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onCodeClick = () => {
    onHandleChange(RichUtils.toggleInlineStyle(editorState, 'CODE'));
  };

  const keyBindingFn = (e: any): string | null => {
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
      return 'myeditor-save';
    }
    return getDefaultKeyBinding(e);
  };

  return (
    <>
      <div className='bg-theme-50 w-full'>
        <div className='flex w-full mx-auto border-b-2 border-theme-2'>
          <button onClick={onBoldClick} className='p-3'><b>B</b></button>
          <button onClick={onUnderlineClick} className='p-3'>U</button>
          <button onClick={onItalicClick} className='p-3'><em>I</em></button>
          <button onClick={onCodeClick} className='p-3'>{'< >'}</button>
        </div>
        <div className='p-3'>
          <Editor
            editorState={editorState}
            onChange={onHandleChange}
            keyBindingFn={keyBindingFn}
          />
        </div>
      </div>
    </>
  );
};

export default EditorComponent;
