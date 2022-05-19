import React from 'react';
import { transferFeatures } from '../../constants/mockData';

export const Info = () => {
  return (
    <div className="relative">
      <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
        Say "Thanks!" like you mean it.
      </h3>
      <p className="mt-3 text-lg text-gray-500">
        There's always a good reason to say thank you to others. Whether someone helped you save some time, correct a
        mistake, learn something new or develop an idea ... just say "Thanks!".
      </p>

      <dl className="mt-10 space-y-10">
        {transferFeatures.map((item) => (
          <div key={item.id} className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-700">{item.name}</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">{item.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
