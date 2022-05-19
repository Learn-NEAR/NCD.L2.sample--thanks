import React, { useEffect, useState } from 'react';
import { useContract } from '../../../context/ContractsProvider';

export const ChangeContract = ({ error, setApiError, setIsOpenChangeContact }) => {
  const {
    data: { registryContractId, contractId },
    setContracts,
  } = useContract();

  const defaultRegistryContractId = process.env.REACT_APP_REGISTRY_CONTRACT_ID;
  const defaultContractId = process.env.REACT_APP_CONTRACT_ID;

  const [inputRegistryContract, setInputRegistryContract] = useState(registryContractId);
  const [inputContract, setInputContract] = useState(contractId);

  const setDefaultContractId = () => {
    setContracts(defaultContractId, defaultRegistryContractId);
    setInputRegistryContract(defaultRegistryContractId);
    setInputContract(defaultContractId);
    setApiError('');
  };

  const applyContracts = () => {
    setContracts(inputContract, inputRegistryContract);
    setApiError('');
  };

  useEffect(() => {
    setInputRegistryContract(registryContractId);
    setApiError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registryContractId]);

  useEffect(() => {
    setInputContract(contractId);
    setApiError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractId]);

  return (
    <div className="fixed z-50 w-full min-h-screen bg-gray-200 bg-opacity-50 left-0 top-0">
      <div className="flex items-center justify-center w-full h-full pt-44">
        <div className="relative flex flex-col items-center w-368 sm:w-500 bg-white rounded-xl px-5 sm:px-14 pt-6 pb-11">
          <button onClick={() => setIsOpenChangeContact(false)} className="absolute top-4 right-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M17.9996 17.9996L6 6"
                stroke="black"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.9998 6.00037L17.2498 6.75034M6.00011 18L11.9999 12.0002L14.5001 9.5"
                stroke="black"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <svg xmlns="http://www.w3.org/2000/svg" width="151" height="40" viewBox="0 0 151 40" fill="none">
            <g clipPath="url(#clip0_5_2981)">
              <path
                d="M75.5882 8.3006V31.4804C75.5882 31.657 75.4558 31.8336 75.235 31.8336H72.8067C71.7029 31.8336 70.6432 31.2597 70.0251 30.3325L59.0754 13.4222L59.4286 21.8553V31.5246C59.4286 31.7012 59.2961 31.8778 59.0754 31.8778H55.8964C55.7198 31.8778 55.5432 31.7453 55.5432 31.5246V8.3006C55.5432 8.124 55.6757 7.94739 55.8964 7.94739H58.2806C59.3844 7.94739 60.4441 8.52136 61.0622 9.44856L72.0119 26.3146L71.6587 17.8816V8.3006C71.6587 8.124 71.7912 7.94739 72.0119 7.94739H75.1909C75.4558 7.94739 75.5882 8.07984 75.5882 8.3006Z"
                fill="black"
              />
              <path
                d="M108.172 31.7895H104.817C104.596 31.7895 104.42 31.5687 104.508 31.348L113.427 8.25645C113.515 8.07984 113.691 7.94739 113.868 7.94739H118.107C118.327 7.94739 118.504 8.07984 118.548 8.25645L127.511 31.348C127.599 31.5687 127.423 31.7895 127.202 31.7895H123.846C123.714 31.7895 123.582 31.7012 123.537 31.5687L116.341 12.5834C116.252 12.3184 115.811 12.3184 115.722 12.5834L108.526 31.5687C108.437 31.7012 108.305 31.7895 108.172 31.7895Z"
                fill="black"
              />
              <path
                d="M150.912 31.2597L144.201 22.6942C147.998 21.9877 150.205 19.4269 150.205 15.4974C150.205 10.9939 147.291 7.94739 142.081 7.94739H132.721C132.456 7.94739 132.235 8.16815 132.235 8.43306C132.235 10.1991 133.648 11.612 135.414 11.612H141.728C144.863 11.612 146.364 13.2015 146.364 15.5415C146.364 17.8816 144.907 19.4711 141.728 19.4711H132.809C132.544 19.4711 132.324 19.6918 132.324 19.9567V31.4363C132.324 31.6129 132.456 31.7895 132.677 31.7895H135.856C136.032 31.7895 136.209 31.657 136.209 31.4363V22.9149H139.874L145.702 30.5091C146.32 31.348 147.291 31.7895 148.351 31.7895H150.779C150.956 31.7895 151.088 31.4804 150.912 31.2597Z"
                fill="black"
              />
              <path
                d="M98.1057 7.94739H83.3148C83.0499 7.94739 82.8733 8.124 82.8733 8.38891C82.8733 10.155 84.3303 11.612 86.0964 11.612H98.1057C98.2824 11.612 98.459 11.4796 98.459 11.2588V8.25645C98.4148 8.07984 98.2824 7.94739 98.1057 7.94739ZM98.1057 28.1249H87.0677C86.8911 28.1249 86.7145 27.9924 86.7145 27.7717V21.8111C86.7145 21.6345 86.847 21.4579 87.0677 21.4579H97.2669C97.4435 21.4579 97.6201 21.3255 97.6201 21.1047V18.1024C97.6201 17.9258 97.4876 17.7491 97.2669 17.7491H83.359C83.0941 17.7491 82.8733 17.9699 82.8733 18.2348V31.2597C82.8733 31.5246 83.0941 31.7453 83.359 31.7453H98.1057C98.2824 31.7453 98.459 31.6129 98.459 31.3921V28.3898C98.4148 28.2573 98.2824 28.1249 98.1057 28.1249Z"
                fill="black"
              />
              <path
                d="M31.8778 2.03099L23.5772 14.3494C23.0032 15.1883 24.107 16.2038 24.9018 15.4974L33.0699 8.38889C33.2906 8.21228 33.5997 8.34474 33.5997 8.6538V30.8623C33.5997 31.1713 33.2023 31.3038 33.0257 31.083L8.30058 1.50117C7.50585 0.529825 6.35789 0 5.07749 0H4.19444C1.89854 0 0 1.89854 0 4.2386V35.4982C0 37.8383 1.89854 39.7368 4.2386 39.7368C5.69561 39.7368 7.06433 38.9863 7.85906 37.7058L16.1596 25.3874C16.7336 24.5485 15.6298 23.533 14.8351 24.2395L6.66696 31.3038C6.4462 31.4804 6.13713 31.348 6.13713 31.0389V8.87456C6.13713 8.5655 6.5345 8.43304 6.71111 8.6538L31.4363 38.2357C32.231 39.207 33.4231 39.7368 34.6594 39.7368H35.5424C37.8825 39.7368 39.781 37.8383 39.781 35.4982V4.2386C39.7368 1.89854 37.8383 0 35.4982 0C34.0412 0 32.6725 0.750585 31.8778 2.03099Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_5_2981">
                <rect width="151" height="39.7368" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <p className="text-2xl font-bold text-black mt-4">Contract deploy</p>

          <p className="text-sm text-gray-500 leading-5 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
            <span className="font-bold text-black"> Aenean sit faucibus morbi eu tempor </span> tellus, euismod amet
            faucibus.
          </p>

          <div className="w-full">
            <p className="text-indigo-500 text-sm font-bold mt-3">Current Registry Contract ID:</p>
            <p className="text-black text-sm font-bold">{registryContractId}</p>
            <p className="text-sm ml-3 mt-2 text-left">Your ID:</p>
            <input
              type="text"
              className={`w-full h-10 rounded-xl mt-1 border ${
                error ? 'font-semibold border-2 text-red-600 border-red-600' : 'border-gray-300'
              } outline-none focus:outline-indigo-500 text-sm`}
              placeholder="Set your Registry Contract ID"
              onChange={(e) => setInputRegistryContract(e.target.value)}
              value={inputRegistryContract}
            />
            <p className="text-indigo-500 text-sm font-bold mt-3">Current Contract ID:</p>
            <p className="text-black text-sm font-bold">{contractId}</p>
            <p className="text-sm ml-3 mt-2 text-left">Your ID:</p>
            <input
              type="text"
              className={`w-full h-10 rounded-xl mt-1 border ${
                error ? 'font-semibold border-2 text-red-600 border-red-600' : 'border-gray-300'
              } outline-none focus:outline-indigo-500 text-sm`}
              placeholder="Set your Contract ID"
              onChange={(e) => setInputContract(e.target.value)}
              value={inputContract}
            />
            {/* <input
              type="text"
              className="w-full h-10 rounded-xl mt-1 font-semibold border-2 text-red-600 border-red-600 outline-none focus:outline-indigo-500 text-sm"
              placeholder="Set your ID"
            />
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 mt-1"
                width="16"
                height="13"
                viewBox="0 0 16 13"
                fill="none"
              >
                <path
                  d="M0.666664 13H15.3333L8 0.333313L0.666664 13ZM8.66666 11H7.33333V9.66665H8.66666V11ZM8.66666 8.33331H7.33333V5.66665H8.66666V8.33331Z"
                  fill="#F03738"
                />
              </svg>
              <p className="text-sm mt-2 text-left">Check your ID</p>
            </div> */}
            {contractId !== inputContract || registryContractId !== inputRegistryContract ? (
              <button
                onClick={applyContracts}
                className="w-full h-10 mt-4 bg-indigo-500 hover:bg-white hover:text-indigo-500 border-2 border-indigo-500 flex items-center justify-center font-bold text-white rounded-full transform active:scale-95 duration-200"
              >
                Apply
              </button>
            ) : null}
            <button
              onClick={setDefaultContractId}
              className="w-full h-10 mt-4 bg-white hover:bg-red-600 hover:text-white border-2 border-red-600 flex items-center justify-center font-bold text-red-600 rounded-full transform active:scale-95 duration-200"
            >
              Reset to default
            </button>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};
