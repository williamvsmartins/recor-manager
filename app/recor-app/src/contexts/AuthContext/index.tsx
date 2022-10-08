import React, { createContext, useEffect, useState } from 'react';

import { AuthContextData, AuthProviderProps, Data } from './types';
import { saveUserStorage, getUserStorage, User } from '../../libs/storage';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsloading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async function () {
      const data = await getUserStorage();

      
      setUser(data); 
      setIsloading(false);
    })()
  }, [])

  async function handleAuth(user: Data) {
    await saveUserStorage(user);

    setUser(user);
  }

  

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth: !!user?.name,
        isLoading,
        handleAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}