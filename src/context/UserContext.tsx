import React, { createContext, useContext, useState } from 'react';

export type AvailabilityStatus = 'Available' | 'Busy' | 'Not Available';
export type PayoutMethod = 'Bank Transfer' | 'PayPal' | 'Wise';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  headline: string;
  bio: string;
  location: string;
  availabilityStatus: AvailabilityStatus;
  role: 'Freelancer' | 'Client';
  payoutMethod: PayoutMethod;
  accountHolder: string;
  iban: string;
  taxCountry: string;
  notifications: {
    emailOrderUpdates: boolean;
    emailNewMessages: boolean;
    emailNewProposals: boolean;
    emailMarketing: boolean;
    pushMilestones: boolean;
    pushMessages: boolean;
  };
  isLoggedIn: boolean;
}

interface UserContextType {
  user: UserProfile;
  signupUser: (params: { name: string; email: string; role: 'Freelancer' | 'Client' }) => void;
  updateProfile: (fields: Partial<UserProfile>) => void;
  setAvailabilityStatus: (status: AvailabilityStatus) => void;
  updatePayoutInfo: (fields: Partial<Pick<UserProfile, 'payoutMethod' | 'accountHolder' | 'iban' | 'taxCountry'>>) => void;
  updateNotifications: (notifications: Partial<UserProfile['notifications']>) => void;
  logout: () => void;
  deactivateAccount: () => void;
  deleteAccount: () => void;
}

const DEFAULT_USER: UserProfile = {
  name: 'Mira Vance',
  email: 'mira.vance@studio.com',
  phone: '',
  headline: 'Brand Designer & Identity Systems',
  bio: 'I build identity systems for founders who care about longevity over trends.',
  location: 'Lisbon, PT',
  availabilityStatus: 'Available',
  role: 'Freelancer',
  payoutMethod: 'Bank Transfer',
  accountHolder: 'Mira Vance',
  iban: 'PT50 •••• •••• 4417',
  taxCountry: 'Portugal',
  notifications: {
    emailOrderUpdates: true,
    emailNewMessages: true,
    emailNewProposals: true,
    emailMarketing: false,
    pushMilestones: true,
    pushMessages: true,
  },
  isLoggedIn: true,
};

const UserContext = createContext<UserContextType>({
  user: DEFAULT_USER,
  signupUser: () => {},
  updateProfile: () => {},
  setAvailabilityStatus: () => {},
  updatePayoutInfo: () => {},
  updateNotifications: () => {},
  logout: () => {},
  deactivateAccount: () => {},
  deleteAccount: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);

  const signupUser = ({ name, email, role }: { name: string; email: string; role: 'Freelancer' | 'Client' }) => {
    setUser(prev => ({
      ...prev,
      name: name.trim() || prev.name,
      email: email.trim() || prev.email,
      role,
      accountHolder: name.trim() || prev.accountHolder,
      isLoggedIn: true,
    }));
  };

  const updateProfile = (fields: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...fields }));
  };

  const setAvailabilityStatus = (status: AvailabilityStatus) => {
    setUser(prev => ({ ...prev, availabilityStatus: status }));
  };

  const updatePayoutInfo = (fields: Partial<Pick<UserProfile, 'payoutMethod' | 'accountHolder' | 'iban' | 'taxCountry'>>) => {
    setUser(prev => ({ ...prev, ...fields }));
  };

  const updateNotifications = (notifications: Partial<UserProfile['notifications']>) => {
    setUser(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        ...notifications,
      },
    }));
  };

  const logout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
  };

  const deactivateAccount = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
  };

  const deleteAccount = () => {
    setUser({
      name: '',
      email: '',
      phone: '',
      headline: '',
      bio: '',
      location: '',
      availabilityStatus: 'Not Available',
      role: 'Freelancer',
      payoutMethod: 'Bank Transfer',
      accountHolder: '',
      iban: '',
      taxCountry: '',
      notifications: {
        emailOrderUpdates: false,
        emailNewMessages: false,
        emailNewProposals: false,
        emailMarketing: false,
        pushMilestones: false,
        pushMessages: false,
      },
      isLoggedIn: false,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signupUser,
        updateProfile,
        setAvailabilityStatus,
        updatePayoutInfo,
        updateNotifications,
        logout,
        deactivateAccount,
        deleteAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
