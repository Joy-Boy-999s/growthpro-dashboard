import { useBusiness } from '../context/BusinessContext';

export default function BusinessCard() {
  const { businessData, regenerateHeadline, loading } = useBusiness();

  if (!businessData) return null;

  const handleRegenerate = () => {
    regenerateHeadline({
      name: businessData.name,
      location: businessData.location
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{businessData.name}</h2>
        <span className="text-sm text-gray-500">{businessData.location}</span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-yellow-500">{businessData.rating}★</span>
        </div>
        <span className="text-gray-600">{businessData.reviews} reviews</span>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-500 mb-1">SEO Headline</h3>
        <p className="text-lg font-semibold text-gray-800">{businessData.headline}</p>
      </div>

      <button
        onClick={handleRegenerate}
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Generating...' : 'Regenerate SEO Headline'}
      </button>
    </div>
  );
}