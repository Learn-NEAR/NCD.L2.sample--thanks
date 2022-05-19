import React, { useCallback, useEffect, useState } from 'react';
import { Message } from './Message';
import { RadioGroup } from '@headlessui/react';
import { getMessages } from '../../services/near';
import { mockDonatesHistory } from '../../constants/mockData';
import { useContract } from '../../context/ContractsProvider';

export const MessageHistory = ({ isOwner }) => {
  const {
    data: { contractId, registryContractId },
  } = useContract();

  const [messages, setMessages] = useState(null);

  const getData = useCallback(async () => {
    if (isOwner) {
      try {
        setMessages(await getMessages());
      } catch (e) {
        console.error(e);
      }
    } else {
      setMessages(mockDonatesHistory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractId, registryContractId, isOwner]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
      <RadioGroup>
        <RadioGroup.Label className="sr-only">Message History</RadioGroup.Label>
        <RadioGroup.Option>
          {messages?.map((item, id) => (
            <Message key={id} item={item} />
          ))}
        </RadioGroup.Option>
      </RadioGroup>
    </div>
  );
};
