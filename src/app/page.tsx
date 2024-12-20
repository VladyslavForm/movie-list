import {Heading} from '@/lib/components/layout/heading'
import {MainButton} from '@/lib/components/buttons/main-button'
import {Card} from '@/lib/components/layout/card'
import React from 'react'
import {IconButton} from '@/lib/components/buttons/icon-button'
import Link from 'next/link'
import {fetchMovies} from '@/lib/data'
import {signOut} from '@/auth'

export default async function Home() {
  const movies = await fetchMovies()

  return (
    !movies.length
      ? (
        <div className="flex flex-col items-center justify-center p-8 pb-20 gap-10 sm:p-20">
          <Heading variant="2" text="Your movie list is empty"/>
          <Link href='create-movie'>
            <MainButton>
              Add a new movie
            </MainButton>
          </Link>
        </div>
      )
      : (
        <div className="min-h-screen flex flex-col py-8 pb-20 gap-32 sm:p-20">
          <div className="flex flex-row items-center justify-between gap-3 w-full">
            <div className="flex items-center">
              <Heading variant="2" text="My movies"/>
              <Link href="create-movie">
                <IconButton icon="/assets/images/circle-plus.svg" className="pt-2"/>
              </Link>
            </div>
            <form
              action={async () => {
                'use server';
                await signOut({redirectTo: '/'});
              }}
            >
              <IconButton icon="/assets/images/logout.svg" label="Logout" />
            </form>
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
            {movies.map(movie => {
              return (
                <Card
                  image={movie.image}
                  title={movie.title}
                  release_year={movie.release_year}
                  id={movie.id}
                  key={movie.id}
                />
              )
            })}
          </div>
        </div>
      )
  )
}
