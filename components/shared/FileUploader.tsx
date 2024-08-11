"use client"

import React, { useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"

interface FileUploaderProps {
  onFileSelect: (file: File) => void
  imageUrl?: string
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  imageUrl,
}) => {
  const [file, setFile] = useState<File | null>(null)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        setFile(acceptedFiles[0])
        onFileSelect(acceptedFiles[0])
      }
    },
  })

  useEffect(() => {
    if (imageUrl) {
      setFile(null)
    }
  }, [imageUrl])

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center w-full h-64 p-5 border-2 border-dashed rounded-lg cursor-pointer transition duration-300 ease-in-out ${
        isDragActive
          ? "border-blue-400 bg-blue-50"
          : file || imageUrl
          ? "border-green-400 bg-green-50"
          : "border-gray-300 bg-gray-50"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={50}
          height={50}
          className="mb-4"
        />
        <p className="text-center text-gray-500">
          {isDragActive
            ? "Drop the files here..."
            : file
            ? `Selected file: ${file.name}`
            : imageUrl
            ? "Drag & drop to replace the file, or click to select a new file"
            : "Drag & drop some files here, or click to select files"}
        </p>
        {file && file.type.startsWith("image/") ? (
          <div className="mt-4">
            <Image
              width={128}
              height={128}
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-32 h-32 object-contain rounded-lg"
            />
          </div>
        ) : imageUrl ? (
          <div className="mt-4">
            <Image
              width={128}
              height={128}
              src={imageUrl}
              alt="Uploaded Image"
              className="w-32 h-32 object-contain rounded-lg"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default FileUploader
