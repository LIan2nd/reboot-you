// Import necessary components and functions
import React from 'react';
import { getQuotes } from '../../_services/getExternalAPI'; // Assuming this fetches quotes data from an external API
import useFetch from '../../hooks/useFetch'; // A custom hook for fetching data
import Card from '../Card'; // A custom Card component for display

//main functional component Quote
const Quote = () => {
  // Using the useFetch hook to fetch data from getQuotes API
  const { data, loading, error } = useFetch(getQuotes);

  // Extract the first quote if data is available
  const quote = data && data[0]; // Check for undefined data

  // Render the Card component only if there's no loading state and no error
  return (
    <Card title="Quote of the Day">
      {!loading && !error && ( // Render card only if the data is not loading or there's no error
        <>
          <q
            cite={quote?.author} // Conditional rendering of the author as 'cite' attribute
            className='text-lg md:text-xl lg:text-2xl text-gray-950 dark:text-gray-50 font-medium' // Styles for quote
          // Conditional rendering of the quote content
          >{quote?.content}</q>
          <p
            className='mt-2 text-md md:text-lg text-gray-800 dark:text-gray-200' // Styles for author
          // Fallback to 'Unknown Author' in case author is missing
          >- {quote?.author || 'Unknown Author'}</p>
        </>
      )}
    </Card>
  );
};

// Export the component for reuse in other files
export default Quote;