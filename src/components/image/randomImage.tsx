'use client';

import React from 'react'
import Image from 'next/image';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json())

const RandomImage = ({ query, index }: { query?: string, index?: number }) => {

  const { data, error, isLoading } = useSWR(`/api/unsplash/random?query=${query}&seed=${index}`, fetcher);

  if (error) return <div className='text-xs text-gray-800 tracking-wide animate-pulse'>failed to fetch image</div>

  if (isLoading) return <div className='text-xs text-gray-800 tracking-wide animate-pulse'>loading..</div>

  return (
    <>
        <Image
          src={data?.urls?.small}
          alt="image"
          fill
          priority
          className="object-cover"
        />
    </>
  )
}

export default RandomImage;