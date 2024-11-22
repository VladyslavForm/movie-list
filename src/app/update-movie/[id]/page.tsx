import React from 'react'
import {Heading} from '@/lib/components/layout/heading'
import {MovieForm} from '@/lib/components/layout/movie-form'
import {fetchMovieById} from '@/lib/data'

export default async function UpdateMovie({params}: { params: { id: string } }) {
  const id = params.id
  const movie = await fetchMovieById(id)
  console.log('movie', movie)

  return (
    <div className="min-h-screen flex flex-col py-8 pb-20 gap-32 sm:p-20">
      <Heading variant="2" text={`Edit ${movie.title}`}/>
      <MovieForm movie={{
        id,
        title: movie.title,
        image: movie.image,
        release_year: movie.release_year
      }}/>
    </div>
  )
}
