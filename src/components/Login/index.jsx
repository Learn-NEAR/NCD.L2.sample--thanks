import React, { useEffect, useState } from 'react';
import { wallet } from '../../services/near';
import { ChangeContract } from './ChangeContract';
import { useToasts } from 'react-toast-notifications';
import { useContract } from '../../context/ContractsProvider';
import { UserIcon, LogoutIcon } from '@heroicons/react/outline';

export const Login = ({ error, setApiError }) => {
  const {
    data: { contractId },
    user,
    setUser,
    signOut,
  } = useContract();

  const { addToast } = useToasts();

  const [isOpenChangeContact, setIsOpenChangeContact] = useState(false);

  const signIn = async () => {
    try {
      await wallet().requestSignIn(contractId);
    } catch (error) {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 30000,
      });
    }
  };

  useEffect(() => {
    const userData = wallet().getAccountId();
    setUser(userData);
  }, [setUser, contractId]);

  return (
    <div className="px-5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
      <div className="flex items-center">
        {isOpenChangeContact ? (
          <>
            <div className="relative flex items-center">
              <div className="absolute z-10 -left-2 w-16 h-16 rounded-full bg-gray-200 animate-pulse duration-75"></div>

              <button className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <path
                    d="M22.6667 24.0975V14.1667H19.8334V24.0975H15.5834L21.25 29.75L26.9167 24.0975H22.6667ZM12.75 4.25L7.08337 9.9025H11.3334V19.8333H14.1667V9.9025H18.4167L12.75 4.25ZM22.6667 24.0975V14.1667H19.8334V24.0975H15.5834L21.25 29.75L26.9167 24.0975H22.6667ZM12.75 4.25L7.08337 9.9025H11.3334V19.8333H14.1667V9.9025H18.4167L12.75 4.25Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <ChangeContract error={error} setApiError={setApiError} setIsOpenChangeContact={setIsOpenChangeContact} />
          </>
        ) : (
          <div className="relative flex items-center">
            <div className="absolute z-10 -left-2 w-16 h-16 rounded-full bg-indigo-300 animate-pulse duration-75" />
            <button
              onClick={() => setIsOpenChangeContact(true)}
              className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 hover:bg-gray-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path
                  d="M22.6667 24.0975V14.1667H19.8334V24.0975H15.5834L21.25 29.75L26.9167 24.0975H22.6667ZM12.75 4.25L7.08337 9.9025H11.3334V19.8333H14.1667V9.9025H18.4167L12.75 4.25ZM22.6667 24.0975V14.1667H19.8334V24.0975H15.5834L21.25 29.75L26.9167 24.0975H22.6667ZM12.75 4.25L7.08337 9.9025H11.3334V19.8333H14.1667V9.9025H18.4167L12.75 4.25Z"
                  fill="white"
                />
              </svg>
            </button>
            <p className="ml-4 text-sm font-bold">Try frontend with your deployed contract ID</p>
          </div>
        )}
      </div>
      {user ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center cursor-pointer h-12 p-4 rounded-md bg-indigo-500 text-white mx-2">
            <span>
              <UserIcon className="w-6 h-6 text-black-500" />
            </span>
            <h4 className="mr-2">{user}</h4>
          </div>
          <div
            onClick={signOut}
            className="flex items-center justify-center h-12 px-5 rounded-md bg-indigo-500 hover:bg-indigo-400 text-white mx-2 cursor-pointer"
          >
            <LogoutIcon className="w-6 h-6 text-black-500" />
          </div>
        </div>
      ) : (
        <button
          onClick={signIn}
          className="self-end rounded-3xl  py-3 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      )}
    </div>
  );
};
