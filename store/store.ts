import { combineReducers, configureStore } from "@reduxjs/toolkit"
import CounterSlice from "./slices/Counter.slice"
import userReducer from "./slices/userSlice"
import {
  persistStore,
  persistReducer,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})


export const persistor = persistStore(store)

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
