import React, { createContext, useContext, useState } from 'react';

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  loginAdmin: (email?: string, password?: string) => void;
  logoutAdmin: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdminLoggedIn: false,
  loginAdmin: () => {},
  logoutAdmin: () => {},
});

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  const loginAdmin = () => {
    setIsAdminLoggedIn(true);
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
