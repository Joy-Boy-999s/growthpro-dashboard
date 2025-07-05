import { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { BusinessRequest } from '@growthpro-dashboard/shared-models';

export default function BusinessForm() {
  const { fetchBusinessData, loading } = useBusiness();
  const [formData, setFormData] = useState<BusinessRequest>({
    name: '',
    location: '',
  });
  const [errors, setErrors] = useState<Partial<BusinessRequest>>({});

  const validate = (): boolean => {
    const newErrors: Partial<BusinessRequest> = {};
    if (!formData.name.trim()) newErrors.name = 'Business name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      fetchBusinessData(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof BusinessRequest]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Business Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${
            errors.name ? 'border-red-500' : ''
          }`}
          placeholder="e.g. Cake & Co"
          disabled={loading}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${
            errors.location ? 'border-red-500' : ''
          }`}
          placeholder="e.g. Mumbai"
          disabled={loading}
        />
        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : 'Get Business Insights'}
        </button>
      </div>
    </form>
  );
}