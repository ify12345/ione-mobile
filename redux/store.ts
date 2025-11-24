
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  persistReducer,
  persistStore,
  PERSIST,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER
} from 'redux-persist'
import languageReducer from './reducers/language'
import authReducer from './reducers/auth'
import sessionReducer from './reducers/sessions'


const asyncPersistConfig = {
  key: 'main',
  storage: AsyncStorage,
}

const persistedLangReducer = persistReducer(asyncPersistConfig, languageReducer)
const persistedAuthReducer = persistReducer(asyncPersistConfig, authReducer)

const reducers = combineReducers({
  language: persistedLangReducer,
  auth: persistedAuthReducer,
  sessions: sessionReducer
})


const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
})

export const persistor = persistStore(store)
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;