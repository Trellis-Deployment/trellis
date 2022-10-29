import { createContext, useContext } from "react";

interface AppContextInterface {
    appName: string;
    setAppName: string;
    appId: string;
    setAppId: string;
    authUser: string;
    setAuthUser: string;
    userId: string;
    setUserId: string;
}

export const AppContext = createContext<AppContextInterface | null>(null);

export function useAppContext() {
  return useContext(AppContext);
}