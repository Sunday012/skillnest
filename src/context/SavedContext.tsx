import React, { createContext, useContext, useState } from 'react';

export interface SavedGig {
  id: string;
  title: string;
  price: number;
  rating?: number;
  sellerRating?: number;
  reviews?: number;
  sellerName: string;
  sellerVerified?: boolean;
  sellerAvatar?: string;
  deliveryTime?: string;
}

export interface SavedTalent {
  id: string;
  name: string;
  role: string;
  location?: string;
  initial: string;
  isVerified: boolean;
  rating: number;
  reviews: number;
  price: number;
}

interface SavedContextType {
  savedGigs: SavedGig[];
  savedTalents: SavedTalent[];
  isGigSaved: (id: string) => boolean;
  toggleSaveGig: (gig: SavedGig) => void;
  isTalentSaved: (id: string) => boolean;
  toggleSaveTalent: (talent: SavedTalent) => void;
  clearAll: () => void;
  clearSaved: () => void;
}

const INITIAL_GIGS: SavedGig[] = [
  {
    id: '1',
    title: 'Complete brand identity & logo system',
    price: 450,
    rating: 4.9,
    sellerRating: 4.9,
    reviews: 212,
    sellerName: 'Mira Vance',
    sellerVerified: true,
    sellerAvatar: 'M',
    deliveryTime: '3 days',
  },
  {
    id: '2',
    title: 'Responsive landing page in React & Tailwind',
    price: 890,
    rating: 5.0,
    sellerRating: 5.0,
    reviews: 98,
    sellerName: 'Devon Park',
    sellerVerified: true,
    sellerAvatar: 'D',
    deliveryTime: '5 days',
  },
  {
    id: '3',
    title: 'Product launch motion graphics & edits',
    price: 620,
    rating: 4.8,
    sellerRating: 4.8,
    reviews: 164,
    sellerName: 'Aria Sol',
    sellerVerified: true,
    sellerAvatar: 'A',
    deliveryTime: '4 days',
  },
  {
    id: '4',
    title: 'SaaS dashboard design, Figma to spec',
    price: 1240,
    rating: 4.9,
    sellerRating: 4.9,
    reviews: 131,
    sellerName: 'Priya Nair',
    sellerVerified: true,
    sellerAvatar: 'P',
    deliveryTime: '7 days',
  },
];

const INITIAL_TALENTS: SavedTalent[] = [
  {
    id: '4',
    name: 'Jonas Weber',
    role: 'Data & AI Engineer · Zürich, CH',
    initial: 'J',
    isVerified: true,
    rating: 4.8,
    reviews: 54,
    price: 130,
  },
  {
    id: '5',
    name: 'Theo Lang',
    role: 'Copywriter & Content Strategist',
    initial: 'T',
    isVerified: true,
    rating: 4.7,
    reviews: 76,
    price: 95,
  },
];

const SavedContext = createContext<SavedContextType>({
  savedGigs: [],
  savedTalents: [],
  isGigSaved: () => false,
  toggleSaveGig: () => {},
  isTalentSaved: () => false,
  toggleSaveTalent: () => {},
  clearAll: () => {},
  clearSaved: () => {},
});

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedGigs, setSavedGigs] = useState<SavedGig[]>(INITIAL_GIGS);
  const [savedTalents, setSavedTalents] = useState<SavedTalent[]>(INITIAL_TALENTS);

  const isGigSaved = (id: string) => savedGigs.some(g => g.id === id);

  const toggleSaveGig = (gig: SavedGig) => {
    setSavedGigs(prev => {
      if (prev.some(g => g.id === gig.id)) {
        return prev.filter(g => g.id !== gig.id);
      }
      return [...prev, gig];
    });
  };

  const isTalentSaved = (id: string) => savedTalents.some(t => t.id === t.id);

  const toggleSaveTalent = (talent: SavedTalent) => {
    setSavedTalents(prev => {
      if (prev.some(t => t.id === talent.id)) {
        return prev.filter(t => t.id !== talent.id);
      }
      return [...prev, talent];
    });
  };

  const clearAll = () => {
    setSavedGigs([]);
    setSavedTalents([]);
  };

  return (
    <SavedContext.Provider
      value={{
        savedGigs,
        savedTalents,
        isGigSaved,
        toggleSaveGig,
        isTalentSaved,
        toggleSaveTalent,
        clearAll,
        clearSaved: clearAll,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);
