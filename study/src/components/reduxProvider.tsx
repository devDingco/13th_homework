"use client"; // 🔴 Read Quote below

import { Provider } from "react-redux";
import { store } from "@/libs/redux/config/store";

export function ReduxProviders({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProviders;
