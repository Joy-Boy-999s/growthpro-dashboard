import { createContext, useContext, useState } from 'react';
import { BusinessData, BusinessRequest } from '@growthpro-dashboard/shared-models';

interface BusinessContextType {
  businessData: BusinessData | null;
  loading: boolean;
  error: string | null;
  fetchBusinessData: (data: BusinessRequest) => Promise<void>;
  regenerateHeadline: (data: BusinessRequest) => Promise<void>;
}

const BusinessContext = createContext<BusinessContextType>({} as BusinessContextType);

export const BusinessProvider = ({ children }: { children: React.ReactNode }) => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinessData = async ({ name, location }: BusinessRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/business-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, location }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch business data');
      }

      const data = await response.json();
      setBusinessData({ ...data, name, location });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const regenerateHeadline = async ({ name, location }: BusinessRequest) => {
    if (!name || !location) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://growthpro-dashboard.onrender.com/api/regenerate-headline?name=${encodeURIComponent(name)}&location=${encodeURIComponent(location)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to regenerate headline');
      }

      const { headline } = await response.json();
      setBusinessData(prev => prev ? { ...prev, headline } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BusinessContext.Provider
      value={{
        businessData,
        loading,
        error,
        fetchBusinessData,
        regenerateHeadline,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(BusinessContext);