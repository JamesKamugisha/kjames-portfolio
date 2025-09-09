import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Optional API service - won't break if it fails to load
let apiService: any = null;

interface PortfolioState {
  availableForWork: boolean;
  theme: 'light' | 'dark';
  isLoading: boolean;
}

type PortfolioAction =
  | { type: 'TOGGLE_AVAILABILITY' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_AVAILABILITY'; payload: boolean };

const initialState: PortfolioState = {
  availableForWork: false,
  theme: 'light',
  isLoading: false,
};

const portfolioReducer = (state: PortfolioState, action: PortfolioAction): PortfolioState => {
  switch (action.type) {
    case 'TOGGLE_AVAILABILITY':
      return { ...state, availableForWork: !state.availableForWork };
    case 'SET_AVAILABILITY':
      return { ...state, availableForWork: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
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

  // Load initial state from localStorage first (for faster loading)
  React.useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      dispatch({ type: 'SET_THEME', payload: savedTheme as 'light' | 'dark' });
    }

    // Load availability from localStorage first, then try API
    const savedAvailability = localStorage.getItem('availableForWork');
    if (savedAvailability !== null) {
      const isAvailable = savedAvailability === 'true';
      dispatch({ type: 'SET_AVAILABILITY', payload: isAvailable });
    }

    // Try to sync with API in background (non-blocking) - only in development
    const syncWithAPI = async () => {
      // Skip API calls if no API_URL is configured
      if (!import.meta.env.VITE_API_URL) {
        console.log('Skipping API sync - no API_URL configured');
        return;
      }

      try {
        // Dynamically import API service
        const apiModule = await import('../services/api');
        const apiService = apiModule.apiService;
        
        const availabilityData = await apiService.getAvailability();
        // Only update if different from current state to avoid loops
        if (availabilityData.availableForWork !== state.availableForWork) {
          dispatch({ type: 'SET_AVAILABILITY', payload: availabilityData.availableForWork });
        }
      } catch (error) {
        console.log('API sync failed, using localStorage:', error);
      }
    };

    // Delay API call to not block initial render
    setTimeout(syncWithAPI, 1000);
  }, []);

  // Save availability changes to localStorage first, then API
  React.useEffect(() => {
    // Only save if this is a user-initiated change (not initial load)
    const isInitialLoad = state.availableForWork === initialState.availableForWork;
    if (!isInitialLoad) {
      // Save to localStorage immediately for instant feedback
      localStorage.setItem('availableForWork', String(state.availableForWork));
      
      // Try to save to API in background (non-blocking) - only if API is configured
      const saveToAPI = async () => {
        // Skip API calls if no API_URL is configured
        if (!import.meta.env.VITE_API_URL) {
          console.log('Skipping API save - no API_URL configured');
          return;
        }

        try {
          // Dynamically import API service
          const apiModule = await import('../services/api');
          const apiService = apiModule.apiService;
          
          await apiService.updateAvailability(state.availableForWork);
          console.log('Availability saved to API successfully');
        } catch (error) {
          console.log('Failed to save to API, using localStorage only:', error);
        }
      };
      
      saveToAPI();
    }
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
