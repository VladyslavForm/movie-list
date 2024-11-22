'use client'
import React, {useState} from 'react'
import {TextInput} from '@/lib/components/inputs/text-input'
import {MainButton} from '@/lib/components/buttons/main-button'
import DragNdrop from '@/lib/components/layout/dnd-component'
import {createMovie, updateMovie, uploadImageToFirebase} from '@/lib/actions'
import {useRouter} from 'next/navigation'
import {Movie} from '@/lib/definitions'

interface MovieFormProps {
  movie?: Movie
}

export const MovieForm: React.FC<MovieFormProps> = ({movie}) => {
  const [title, setTitle] = useState(movie?.title || '')
  const [releaseYear, setReleaseYear] = useState(movie?.release_year || '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!title || !releaseYear || (!imageFile && !movie?.image)) {
      setErrorMessage('All fields are required!')
      return
    }

    try {
      let imageUrl = movie?.image || ''

      if (imageFile) {
        imageUrl = await uploadImageToFirebase(imageFile)
      }

      const formData = new FormData()
      formData.append('title', title)
      formData.append('release_year', releaseYear)
      formData.append('image', imageUrl)

      if (movie) {
        await updateMovie(movie.id, {}, formData)
      } else {
        await createMovie({}, formData)
      }

      setErrorMessage(null)
      router.push('/')
    } catch (error) {
      setErrorMessage(
        `Failed to ${movie ? 'update' : 'create'} movie. Please try again.`
      )
    }
  }

  return (
    <form className="flex flex-row gap-32" onSubmit={handleSubmit}>
      <DragNdrop onFilesSelected={setImageFile} width="470px" height="500px"/>
      <div>
        <TextInput
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-6"
        />
        <TextInput
          placeholder="Publishing year"
          value={releaseYear}
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
          <MainButton type="submit">{movie ? 'Update' : 'Submit'}</MainButton>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </form>
  )
}
