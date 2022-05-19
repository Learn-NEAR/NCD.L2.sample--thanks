import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';

export const Button = ({ isLoading, onClick, children }) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    !isLoading && setClicked(false);
  }, [isLoading]);
  return (
    <button
      onClick={(e) => {
        onClick(e);
        setClicked(true);
      }}
      className="flex py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {children}
      {isLoading && clicked ? <Loader color="#4f46e5" secondColor="#ffffff" height={20} width={20} /> : ''}
    </button>
  );
};
