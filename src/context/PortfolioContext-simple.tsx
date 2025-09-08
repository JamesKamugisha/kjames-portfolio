import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface PortfolioState {
  availableForWork: boolean;
  theme: 'light' | 'dark';
}

type PortfolioAction =
  | { type: 'TOGGLE_AVAILABILITY' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

const initialState: PortfolioState = {
  availableForWork: false,
  theme: 'light',
};

const portfolioReducer = (state: PortfolioState, action: PortfolioAction): PortfolioState => {
  switch (action.type) {
    case 'TOGGLE_AVAILABILITY':
      return { ...state, availableForWork: !state.availableForWork };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

interface PortfolioContextType {
  state: PortfolioState;
  dispatch: React.Dispatch<PortfolioAction>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  // Load initial state from localStorage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      dispatch({ type: 'SET_THEME', payload: savedTheme as 'light' | 'dark' });
    }

    const savedAvailability = localStorage.getItem('availableForWork');
    if (savedAvailability !== null) {
      const isAvailable = savedAvailability === 'true';
      dispatch({ type: 'TOGGLE_AVAILABILITY' });
      if (!isAvailable) dispatch({ type: 'TOGGLE_AVAILABILITY' });
    }
  }, []);

  // Save availability changes to localStorage
  React.useEffect(() => {
    localStorage.setItem('availableForWork', String(state.availableForWork));
  }, [state.availableForWork]);

  // Save theme to localStorage
  React.useEffect(() => {
    localStorage.setItem('theme', state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  return (
    <PortfolioContext.Provider value={{ state, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  );
};
