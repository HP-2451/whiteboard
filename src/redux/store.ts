
// import { useDispatch } from 'react-redux'
import { Action } from 'redux'
import reduxThunk, { ThunkDispatch } from 'redux-thunk'
// import { SurveyReduxAction, SurveyReduxState } from '../dto/survey.dto'
// import surveyReducer from './surveyReducer'
import surveySlice from './surveySlice'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  version: 1,
  blacklist: ['survey'],
  storage,
}

const persistedReducer = persistReducer(persistConfig, surveySlice.reducer)

// const store: Store<SurveyReduxState, SurveyReduxAction> = createStore(surveyReducer, applyMiddleware(reduxThunk))
const store = configureStore({
  reducer: persistedReducer,
  middleware: [reduxThunk]
})


export let persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppDispatch = () => useDispatch<ThunkAppDispatch>() 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
export default store