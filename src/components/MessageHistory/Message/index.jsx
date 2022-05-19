import React from 'react';
import { RadioGroup } from '@headlessui/react';

export const Message = ({ item }) => {
  const getAmount = (tip) => {
    if (tip == 0) {
      return tip + ' N';
    } else {
      return (tip / 1000000000000000000000000).toFixed(4) + ' N';
    }
  };

  return (
    <div className="mt-4 mx-6 relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-6 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none">
      <div className="flex items-center text-sm">
        <RadioGroup.Label as="div" className="font-medium text-gray-900">
          {item.sender}
        </RadioGroup.Label>
        <RadioGroup.Description as="div" className="text-gray-500 ml-1">
          {item.text}
        </RadioGroup.Description>
      </div>
      <RadioGroup.Description as="div" className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
        <div className="font-medium text-gray-900">{getAmount(item.contribution)}</div>
      </RadioGroup.Description>
      <div
        className="border-transparent absolute -inset-px rounded-lg border-2 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};
