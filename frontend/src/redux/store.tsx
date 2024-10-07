import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./AuthReducer";
import modalReducer from "./ModalReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import HostReducer from "./HostReducer";

const store = configureStore({
  reducer: {
    auth: userReducer,
    modal: modalReducer,
    host: HostReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
