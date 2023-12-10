import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState as RSL, AppDispatch as ADL } from './stateStores/loginStore'
import type { RootState as RSA, AppDispatch as ADA } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => ADL
type DispatchFunc1 = () => ADA
export const useLoginDispatch: DispatchFunc = useDispatch
export const useLoginSelector: TypedUseSelectorHook<RSL> = useSelector
export const useAuthDispatch: DispatchFunc1 = useDispatch
export const useAuthSelector: TypedUseSelectorHook<RSA> = useSelector