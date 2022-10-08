import AsyncStorage from '@react-native-async-storage/async-storage';
import { SaveUser, GetUser, User } from './types';

const getUserStorage: GetUser = async () => {
  const user = await AsyncStorage.getItem('@recor:user');

  if (!user) {
    return {};
  }

  return JSON.parse(user)
}

const saveUserStorage: SaveUser = async (user: User) => {
  await AsyncStorage.setItem('@recor:user', JSON.stringify(user));
}

export {
  getUserStorage,
  saveUserStorage,
}