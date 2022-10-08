import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useUsermust be used within an UserProvider');
  }

  return context;
}