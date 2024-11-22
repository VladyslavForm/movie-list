import React from 'react'
import {Heading} from '@/lib/components/layout/heading'

import {MovieForm} from '@/lib/components/layout/movie-form'

export default function CreateMovie() {
  return (
    <div className="min-h-screen flex flex-col py-8 pb-20 gap-32 sm:p-20">
      <Heading variant="2" text="Create a new movie"/>
      <MovieForm/>
    </div>
  )
}
