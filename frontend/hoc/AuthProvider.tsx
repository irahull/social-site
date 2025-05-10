"use client"
import store from "@/store/store";
import React, { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Persistor, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<Persistor | null>(
    null
  );

  useEffect(() => {
    const clientPersistor = persistStore(store);
    setIsAuthenticated(clientPersistor);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={isAuthenticated}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default AuthProvider;
