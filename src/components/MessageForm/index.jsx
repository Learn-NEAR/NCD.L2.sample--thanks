import Select from 'react-select';
import React, { useState } from 'react';
import { Button } from '../Button';
import { Switch } from '@headlessui/react';
import { useToasts } from 'react-toast-notifications';
import { sendMessage, wallet } from '../../services/near';
import { useContract } from '../../context/ContractsProvider';

export const MessageForm = ({ user, recipients }) => {
  const {
    data: { contractId },
    setContracts,
  } = useContract();

  const { addToast } = useToasts();

  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [attachedDeposit, setAttachedDeposit] = useState();
  const [selectItem, setSelectItem] = useState(recipients.find((item) => item.value === contractId));

  const handleSubmit = async () => {
    if (user) {
      setLoading(true);
      try {
        await sendMessage({
          message,
          anonymous,
          attachedDeposit: formatDeposit(attachedDeposit),
        });
        addToast(`Message sent`, {
          appearance: 'success',
          autoDismiss: true,
          autoDismissTimeout: 30000,
        });
        setMessage('');
        setAttachedDeposit(0);
      } catch (error) {
        const errorMessage = error?.kind?.ExecutionError;
        addToast(errorMessage?.slice(0, errorMessage.match(/, filename/).index), {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 30000,
        });
      }
      setLoading(false);
    } else {
      wallet().requestSignIn(contractId);
    }
  };

  const formatDeposit = (value) => (value > 0 ? (value < 5 ? value : 5) : 0);

  const handleChange = (e) => {
    setSelectItem(e);
    setContracts(e.value);
  };

  return (
    <>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="text-left pb-6">
            <p className="text-lg leading-6 font-medium text-gray-700">Record your message on the blockchain</p>
            <p className="mt-2 text-base text-gray-500">No better way to say "Thanks!" than to make it permanent.</p>
            <p className="Loading your content..." e="mt-2 text-base text-gray-500">
              You can do that right here.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <Select
                className="text-left cursor-pointer"
                placeholder="Recipient name"
                options={recipients}
                value={selectItem}
                onChange={handleChange}
                isSearchable
                isClearable
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="message" className="sr-only">
                Your message
              </label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                rows="4"
                id="message"
                autoComplete={message}
                placeholder="Your message"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <Switch.Group as="div" className="flex items-center">
                <Switch
                  value={anonymous}
                  onChange={() => setAnonymous(!anonymous)}
                  className={`${
                    anonymous ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      anonymous ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  />
                </Switch>
                <Switch.Label as="span" className="ml-3">
                  <span className="text-sm font-medium text-gray-900">Send anonymously </span>
                </Switch.Label>
              </Switch.Group>
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <label htmlFor="tip" className="sr-only">
                Tip
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">Ⓝ</span>
                </div>
                <input
                  type="text"
                  onChange={(e) => setAttachedDeposit(e.target.value?.replace(',', '.'))}
                  onBlur={(e) => setAttachedDeposit(formatDeposit(e.target.value))}
                  value={attachedDeposit}
                  id="tip"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0"
                  aria-describedby="message-tip"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm" id="message-tip">
                    NEAR
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <Button isLoading={isLoading} onClick={handleSubmit}>
                Say Thanks
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div />
    </>
  );
};
