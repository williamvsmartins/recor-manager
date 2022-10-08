export interface User {
    name: string | null;
}
  
  export type GetUser = () => Promise<User>;
  export type SaveUser = (user: User) => Promise<void>;