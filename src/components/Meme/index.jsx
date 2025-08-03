import React from 'react';
import { getMemes } from '../../_services/getExternalAPI';
import useFetch from '../../hooks/useFetch';
import getRandomInt from '../../utils/getRandomInt';

/**
 * Meme component that displays a random meme with motivational message
 * 
 * @param {Object} props - Component props
 * @param {string} [props.additionalClass] - Additional CSS classes for the container
 */
const Meme = ({ additionalClass = '' }) => {
  const { data, loading, error } = useFetch(getMemes);

  // Safely get random meme only when data is available
  const randomMeme = React.useMemo(() => {
    if (!data || data.length === 0) return null;
    return data[getRandomInt(0, data.length - 1)]; // Fixed array bounds
  }, [data]);

  // Loading and error states
  if (loading) return (
    <div className={`${additionalClass} mx-auto space-y-4 text-center`}>
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 w-full rounded-lg"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
    </div>
  );

  if (error) return (
    <div className={`${additionalClass} mx-auto space-y-4 text-center text-red-500`}>
      <p>Failed to load memes. Keep being productive anyway!</p>
    </div>
  );

  if (!randomMeme) return (
    <div className={`${additionalClass} mx-auto space-y-4 text-center`}>
      <p>No memes found. Time to focus on work!</p>
    </div>
  );

  return (
    <div className={`${additionalClass} mx-auto space-y-4 text-center`}>
      <img
        className="w-full max-h-64 object-contain rounded-lg mx-auto"
        loading="lazy"
        src={randomMeme.url}
        alt={randomMeme.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/400?text=Meme+Not+Found';
        }}
      />
      <div className="px-4">
        <h2 className="text-lg font-medium mb-1">
          Did you enjoy the "{randomMeme.name}" meme?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Okay, now get back to being <strong>productive!</strong>
        </p>
      </div>
    </div>
  );
};

export default React.memo(Meme);