'use client'
import React, {useState} from 'react'
import {TextInput} from '@/lib/components/inputs/text-input'
import {MainButton} from '@/lib/components/buttons/main-button'
import DragNdrop from '@/lib/components/layout/dnd-component'
import {updateMovie} from '@/lib/actions'
import {Movie} from '@/lib/definitions'
import {useRouter} from 'next/navigation'
import {useFormState} from 'react-dom'

interface MovieFormProps {
  movie: Movie
}

export const UpdateMovieForm: React.FC<MovieFormProps> = ({movie}) => {
  const [title, setTitle] = useState(movie.title || '')
  const [releaseYear, setReleaseYear] = useState(movie.release_year || '')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFile, setImageFile] = useState<File | null>(null)
  const router = useRouter()

  const updateMovieWithId = updateMovie.bind(null, movie.id);
  const [state, dispatch] = useFormState(updateMovieWithId, {message: ''});

  return (
    <form className="flex flex-col md:flex-row gap-5 lg:gap-32" action={dispatch}>
      <DragNdrop onFilesSelected={setImageFile}/>
      <div className="w-full">
        <TextInput
          placeholder="Title"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title &&
            state.errors.title.map((error: string) => (
              <p className="mt-2 text-body-extra-small text-error" key={error}>
                {error}
              </p>
            ))}
        </div>
        <TextInput
          placeholder="Publishing year"
          value={releaseYear}
          name="release_year"
          onChange={(e) => setReleaseYear(e.target.value)}
          className="mt-6 md:max-w-64"
        />
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.release_year &&
            state.errors.release_year.map((error: string) => (
              <p className="mt-2 text-body-extra-small text-error" key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className="flex gap-4 mt-6 md:mt-16 w-full">
          <MainButton
            outline={true}
            type="button"
            onClick={() => {
              router.push('/')
            }}
          >
            Cancel
          </MainButton>
          <MainButton type="submit">Update</MainButton>
        </div>
      </div>
    </form>
  )
}
