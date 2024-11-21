'use client'
import React, {useState} from 'react'
import {Heading} from '@/lib/components/layout/heading'
import {TextInput} from '@/lib/components/inputs/text-input'
import {MainButton} from '@/lib/components/buttons/main-button'
import DragNdrop from '@/lib/components/layout/dnd-component'

export default function CreateMovie() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileSelection = (selectedFile: File | null): void => {
    setFile(selectedFile)
  };

  return (
    <div className="min-h-screen flex flex-col py-8 pb-20 gap-32 sm:p-20">
      <Heading variant="2" text="Create a new movie"/>
      <div className="flex flex-row gap-32">
        <DragNdrop onFilesSelected={handleFileSelection} width="470px" height="500px" />

        <div className="form">
          <TextInput placeholder="Title" className="mb-6"/>
          <TextInput placeholder="Publishing year" className="mb-16"/>
          <div className="flex gap-4">
            <MainButton outline={true}>
              Cancel
            </MainButton>
            <MainButton>
              Submit
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  )
}
