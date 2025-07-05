import BusinessForm from './components/BusinessForm';
import BusinessCard from './components/BusinessCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import { BusinessProvider, useBusiness } from './context/BusinessContext';

export default function Home() {
  return (
    <BusinessProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-700">GrowthProAI</h1>
            <p className="mt-2 text-gray-600">Local Business Insights Dashboard</p>
          </div>

          <DashboardContent />
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Simulated data for demonstration purposes</p>
          </div>
        </div>
      </div>
    </BusinessProvider>
  );
}

function DashboardContent() {
  const { businessData, loading, error } = useBusiness();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {error && <ErrorAlert message={error} />}
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!businessData ? (
            <BusinessForm />
          ) : (
            <BusinessCard />
          )}
        </>
      )}
    </div>
  );
}