import React, { createContext, useState } from 'react';

interface IProgressContext {
  loading: boolean;
  onLoading: Function;
  doneLoading: Function;
}

export const ProgressContext = createContext({} as IProgressContext);

export const ProgressProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const onLoading = () => {
    setLoading(true);
  };

  const doneLoading = () => {
    setLoading(false);
  };

  return (
    <ProgressContext.Provider
      value={{
        loading,
        onLoading,
        doneLoading,
      }}
    >
      { children}
    </ProgressContext.Provider>
  );
};
