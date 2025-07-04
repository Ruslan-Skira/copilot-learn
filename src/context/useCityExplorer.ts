import { useContext } from 'react';
import { CityExplorerContext } from './CityExplorerContext';

export const useCityExplorer = () => {
  const context = useContext(CityExplorerContext);
  if (!context) {
    throw new Error('useCityExplorer must be used within a CityExplorerProvider');
  }
  return context;
};
