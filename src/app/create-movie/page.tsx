'use client'

import React, { useState } from 'react'
import { Heading } from '@/lib/components/layout/heading'
import { TextInput } from '@/lib/components/inputs/text-input'
import { MainButton } from '@/lib/components/buttons/main-button'
import DragNdrop from '@/lib/components/layout/dnd-component'
import {createMovie, uploadImageToFirebase} from '@/lib/actions'
import {useRouter} from 'next/navigation'

export default function CreateMovie() {
  const [title, setTitle] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!title || !releaseYear || !imageFile) {
      setErrorMessage('All fields are required!')
      return
    }

    try {
      // Upload image to Firebase
      const imageUrl = await uploadImageToFirebase(imageFile);

      // Create form data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('release_year', releaseYear);
      formData.append('image', imageUrl);

      // Call the server action
      const response = await createMovie({}, formData);
      if (response?.message) {
        setErrorMessage(response.message);
      } else {
        setErrorMessage(null);
        // Redirect or show success message
      }
    } catch (error) {
      setErrorMessage('Failed to create movie. Please try again.');
    }
  }

  return (
    <div className="min-h-screen flex flex-col py-8 pb-20 gap-32 sm:p-20">
      <Heading variant="2" text="Create a new movie" />
      <form className="flex flex-row gap-32" onSubmit={handleSubmit}>
        <DragNdrop onFilesSelected={setImageFile} width="470px" height="500px" />
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
            <MainButton outline={true} type="button" onClick={() => setErrorMessage(null)}>
              Cancel
            </MainButton>
            <MainButton type="submit">Submit</MainButton>
          </div>
          {errorMessage && (
            <p className="text-red-500 mt-4">{errorMessage}</p>
          )}
        </div>
      </form>
    </div>
  )
}
