import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

type User = {
  email: string;
};

type AppContextValue = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo<AppContextValue>(
    () => ({
      isAuthenticated: Boolean(user),
      user,
      login: (email: string) => setUser({ email }),
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return context;
}
