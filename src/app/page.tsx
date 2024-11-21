import {Heading} from '@/lib/components/layout/heading'
import {MainButton} from '@/lib/components/buttons/main-button'
import {Card} from '@/lib/components/layout/card'
import React from 'react'
import {IconButton} from '@/lib/components/buttons/icon-button'
import Link from 'next/link'

const isEmpty = false

const movies = [
  {
    "image": "https://via.placeholder.com/300x450",
    "title": "The Shawshank Redemption",
    "year": "1994"
  },
  {
    "image": "https://via.placeholder.com/300x450",
    "title": "The Godfather",
    "year": "1972"
  },
  {
    "image": "https://via.placeholder.com/300x450",
    "title": "The Dark Knight",
    "year": "2008"
  },
  {
    "image": "https://via.placeholder.com/300x450",
    "title": "Inception",
    "year": "2010"
  },
  {
    "image": "https://via.placeholder.com/300x450",
    "title": "The Lord of the Rings: The Return of the King",
    "year": "2003"
  }
]


export default function Home() {
  return (
    isEmpty
      ? (
        <div className="flex flex-col items-center justify-center p-8 pb-20 gap-10 sm:p-20">
          <Heading variant="2" text="Your movie list is empty"/>
          <MainButton>
            Add a new movie
          </MainButton>
        </div>
      )
      : (
        <div className="min-h-screen flex flex-col items-center justify-center py-8 pb-20 gap-10 sm:p-20">
          <div className="flex flex-row items-center justify-between gap-3 w-full">
            <div className="flex items-center">
              <Heading variant="2" text="My movies"/>
              <Link href="create-movie">
                <IconButton icon="/assets/images/circle-plus.svg" className="pt-2"/>
              </Link>
            </div>
            <IconButton icon="/assets/images/logout.svg" label="Logout"/>
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
            {movies.map(movie => {
              return (
                <Card
                  image={movie.image}
                  title={movie.title}
                  year={movie.year}
                  key={movie.image + movie.title}
                />
              )
            })}
          </div>
        </div>
      )
  )
}
