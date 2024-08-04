import React, { SetStateAction, Dispatch } from "react";


type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}
const FileUploader = ({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) => {
  return <div>FileUploader</div>
}

export default FileUploader;
