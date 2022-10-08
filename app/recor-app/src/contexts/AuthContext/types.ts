import { ReactNode } from "react";
import { User } from '../../libs/storage';

export interface Data {
  name: string
}

export interface AuthContextData {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  handleAuth: (data: Data) => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}