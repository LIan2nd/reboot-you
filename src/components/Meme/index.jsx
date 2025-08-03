import React from 'react'
import { getMemes } from '../../_services/getExternalAPI';
import useFetch from '../../hooks/useFetch';
import getRandomInt from '../../utils/getRandomInt';

const Meme = ({ additionalClass }) => {
  const { data, loading, error } = useFetch(getMemes);
  const randomMeme = data[getRandomInt(1, data.length)];
  return (
    <div className={`${additionalClass} mx-auto space-y-4`}>
      {!loading && !error && (
        <>
          <img className='w-full rounded-lg mx-auto' loading='lazy' src={randomMeme.url} alt={randomMeme.name} />
          <div>
            <h2>Do u have fun see "{randomMeme.name}" meme?</h2>
            <p>Oke, now, be <strong>productive!</strong></p>
          </div>
        </>
      )}
    </div>
  )
}

export default Meme;