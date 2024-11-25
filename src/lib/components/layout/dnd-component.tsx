import React, { useEffect, useState } from "react"
import { MdClear } from "react-icons/md"
import Image from "next/image"

interface DragNdropProps {
  onFilesSelected: (file: File | null) => void
  width?: string | number
  height?: string | number
}

const DragNdrop: React.FC<DragNdropProps> = ({ onFilesSelected, width, height }) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      setFile(selectedFiles[0])
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = event.dataTransfer.files
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  useEffect(() => {
    onFilesSelected(file)
  }, [file, onFilesSelected])

  return (
    <section className="rounded-lg">
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed bg-input p-4 relative rounded-lg cursor-pointer ${
          file ? "border-white" : "border-gray-400"
        }`}
        style={{ width: width, height: height }}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <>
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/assets/images/download.svg"
              alt="Image upload"
              width={24}
              height={24}
              className="mb-2"
            />
            <p className="text-sm">
              Drop an image here
            </p>
          </div>
          <input
            type="file"
            name="image"
            hidden
            id="browse"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.webp,.svg,.gif"
          />
          <label
            htmlFor="browse"
            className="flex items-center justify-center px-4 py-2 border border-gray-400 bg-primary text-white rounded-lg cursor-pointer"
          >
            Browse files
          </label>
        </>

        {file && (
          <div className="w-full flex flex-col gap-2 mt-4 p-4">
            <div className="flex justify-between items-center p-2 border border-gray-400 rounded-lg">
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-sm text-white">{file.name}</p>
              </div>
              <div
                className="cursor-pointer hover:text-red-500"
                onClick={handleRemoveFile}
              >
                <MdClear />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default DragNdrop
