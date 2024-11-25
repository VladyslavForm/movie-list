'use client'
import React, {useState} from 'react'
import {TextInput} from '@/lib/components/inputs/text-input'
import {MainButton} from '@/lib/components/buttons/main-button'
import DragNdrop from '@/lib/components/layout/dnd-component'
import {createMovieAction} from '@/lib/actions'
import {useRouter} from 'next/navigation'

export const CreateMovieForm = () => {
  const [title, setTitle] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  return (
    <form className="flex flex-row gap-32" action={createMovieAction}>
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
          <MainButton type="submit">{'Submit'}</MainButton>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </form>
  )
}
