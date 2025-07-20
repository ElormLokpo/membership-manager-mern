import { persistedStore, store } from "@/redux";
import type { ReactElement } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

export const ReduxProvider = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>{children}</PersistGate>
      </Provider>
    </>
  );
};
