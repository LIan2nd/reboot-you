import React from 'react'
import { getQuotes } from '../../_services/getExternalAPI';
import useFetch from '../../hooks/useFetch';
import Card from '../Card';

const Quote = () => {
  const { data, loading, error } = useFetch(getQuotes);
  const quote = data[0];
  return (
    <Card title="Quote of the Day">
      {!loading && !error && (
        <>
          <q cite={quote.author} className='text-lg md:text-xl lg:text-2xl text-gray-950 dark:text-gray-50 font-medium'>{quote?.content}</q>
          <p className='mt-2 text-md md:text-lg text-gray-800 dark:text-gray-200'>- {quote?.author}</p>
        </>
      )}
    </Card>
  )
}

export default Quote;