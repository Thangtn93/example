import AsyncStorage from '@react-native-async-storage/async-storage';

type Key = 'settingOption';
// type Value = 'option1' | 'option2';

export const getItemAsync = (key: Key) => AsyncStorage.getItem(key);

export const setItemAsync = (key: Key, value: string) =>
  AsyncStorage.setItem(key, value);

export const deleteItemAsync = (key: Key) => AsyncStorage.removeItem(key);
