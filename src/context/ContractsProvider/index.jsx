import React, { createContext, useContext, useState } from 'react';
import { wallet } from '../../services/near';

const DataContext = createContext();

export const ContractsProvider = ({ children }) => {
  const defaultContractId = process.env.REACT_APP_CONTRACT_ID;
  const contract = localStorage.getItem('CONTRACT_ID');
  !contract && localStorage.setItem('CONTRACT_ID', defaultContractId);

  const defaultRegistryContractId = process.env.REACT_APP_REGISTRY_CONTRACT_ID;
  const registryContract = localStorage.getItem('REGISTRY_CONTRACT_ID');
  !registryContract && localStorage.setItem('REGISTRY_CONTRACT_ID', defaultRegistryContractId);

  const [data, setData] = useState({
    contractId: contract ?? defaultContractId,
    registryContractId: registryContract ?? defaultRegistryContractId,
  });

  const [user, setUser] = useState();

  const signOut = () => {
    wallet().signOut();
    localStorage.removeItem(`near-api-js:keystore:${user}:testnet`);
    setUser(null);
  };

  const setContracts = (contractId, registryContractId) => {
    contractId !== localStorage.getItem('CONTRACT_ID') && signOut();
    localStorage.setItem('CONTRACT_ID', contractId);
    registryContractId && localStorage.setItem('REGISTRY_CONTRACT_ID', registryContractId);
    setData({ registryContractId: registryContractId || data.registryContractId, contractId });
  };

  return <DataContext.Provider value={{ data, setContracts, user, setUser, signOut }}>{children}</DataContext.Provider>;
};

export const useContract = () => useContext(DataContext);
