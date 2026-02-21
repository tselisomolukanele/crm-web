import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'

const isWeb = Platform.OS === 'web'

export const storage = {
  setItem: async (key: string, value: string) => {
    if (isWeb && typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value)
    } else if (!isWeb) {
      return SecureStore.setItemAsync(key, value)
    }
  },
  getItem: async (key: string) => {
    if (isWeb && typeof localStorage !== 'undefined') {
      return localStorage.getItem(key)
    } else if (!isWeb) {
      return SecureStore.getItemAsync(key)
    }
    return null
  },
  deleteItem: async (key: string) => {
    if (isWeb && typeof localStorage !== 'undefined') {
      localStorage.removeItem(key)
    } else if (!isWeb) {
      return SecureStore.deleteItemAsync(key)
    }
  },
}