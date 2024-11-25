'use client'
import React, {useState} from 'react'
import {TextInput} from '@/lib/components/inputs/text-input'
import {MainButton} from '@/lib/components/buttons/main-button'
import DragNdrop from '@/lib/components/layout/dnd-component'
import {updateMovie} from '@/lib/actions'
import {Movie} from '@/lib/definitions'
import {useRouter} from 'next/navigation'

interface MovieFormProps {
  movie: Movie
}

export const UpdateMovieForm: React.FC<MovieFormProps> = ({movie}) => {
  const [title, setTitle] = useState(movie.title || '')
  const [releaseYear, setReleaseYear] = useState(movie.release_year || '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const updateMovieWithId = updateMovie.bind(null, movie.id);

  return (
    <form className="flex flex-row gap-32" action={updateMovieWithId}>
      <DragNdrop onFilesSelected={setImageFile} width="470px" height="500px"/>
      <div>
        <TextInput
          placeholder="Title"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          className="mb-6"
        />
        <TextInput
          placeholder="Publishing year"
          value={releaseYear}
          name="release_year"
          onChange={(e) => setReleaseYear(e.target.value)}
          className="mb-16"
        />
        <div className="flex gap-4">
          <MainButton
            outline={true}
            type="button"
            onClick={() => {
              setErrorMessage(null)
              router.push('/')
            }}
          >
            Cancel
          </MainButton>
          <MainButton type="submit">Update</MainButton>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </form>
  )
}
