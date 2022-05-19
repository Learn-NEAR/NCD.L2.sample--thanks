import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Loader } from '../Loader';
import { utils } from 'near-api-js';
import { useToasts } from 'react-toast-notifications';
import { getSummarize, transfer } from '../../services/near';
import { useContract } from '../../context/ContractsProvider';

export const Summarize = ({ user, owner }) => {
  const {
    data: { contractId, registryContractId },
  } = useContract();

  const { addToast } = useToasts();

  const [summarize, setSummarize] = useState(null);
  const [isLoadingSummarize, setLoadingSummarize] = useState(true);
  const [isLoadingTransfer, setLoadingTransfer] = useState(false);
  const [onTransfer, setOnTransfer] = useState(false);

  const handleTransfer = async () => {
    setLoadingTransfer(true);
    try {
      const res = await transfer();
      setOnTransfer(true);
      addToast(`Transfer success \n ${res}`, {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 30000,
      });
    } catch (error) {
      const errorMessage = error?.kind?.ExecutionError;
      addToast(errorMessage.slice(0, errorMessage.match(/, filename/).index), {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 30000,
      });
    }
    setLoadingTransfer(false);
  };

  const getData = async () => {
    setLoadingSummarize(true);
    try {
      const res = await getSummarize();
      setSummarize(Object.entries(res?.contributions));
    } catch (error) {
      console.log(error);
    }
    setLoadingSummarize(false);
  };

  useEffect(() => {
    user && owner === user && getData();
  }, [owner, user, contractId, registryContractId, onTransfer]);

  return user && owner === user ? (
    <div className="shadow overflow-hidden sm:rounded-md mt-4">
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="flex flex-col items-center">
          <Button isLoading={isLoadingTransfer} onClick={handleTransfer}>
            Transfer to owner (Me)
          </Button>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {isLoadingSummarize ? (
              <div className="flex justify-center col-span-2 my-6">
                <Loader color="#4f46e5" secondColor="#ffffff" height={104} width={100} />
              </div>
            ) : summarize ? (
              summarize.map(([key, value]) => (
                <>
                  <span className="text-right">{key}:</span>
                  <span className="text-left">
                    {value.length > 10
                      ? utils.format.formatNearAmount(value)
                      : value.toString().match('e')
                      ? value.toString().slice(0, 4)
                      : value}
                  </span>
                </>
              ))
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
