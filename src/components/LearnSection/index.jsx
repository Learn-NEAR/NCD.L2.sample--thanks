import React from 'react';
import { communicationFeatures } from '../../constants/mockData';

export const LearnSection = () => {
  return (
    <div className="lg:col-start-2">
      <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
        Learn to build this yourself!
      </h3>
      <p className="mt-3 text-lg text-gray-500">
        Check out{' '}
        <a href="https://near.university" className="text-blue-500">
          near.university
        </a>{' '}
        to learn how to build this decentralized app.
      </p>

      <dl className="mt-10 space-y-10">
        {communicationFeatures.map((item) => (
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
