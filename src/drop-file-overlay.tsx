import {
  useDropzone,
} from "react-dropzone";
import type { DropEvent, DropzoneOptions, FileRejection } from 'react-dropzone'

import { Upload } from "lucide-react";
import { ComponentProps, PropsWithChildren, useCallback } from "react";
import clsx from "clsx";


function UploadHintCard({ className }: ComponentProps<"div">) {
  return (
    <div
      className={clsx(
        "border-2 border-dashed border-blue-200 rounded-lg p-8 m-6 cursor-pointer",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="bg-blue-100 p-3 rounded-full mb-4">
          <Upload className="text-blue-500" size={24} />
        </div>
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
}

type OnDropFunction = <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
) => void

type DropFileOverlayProps = Pick<DropzoneOptions, 'accept' | 'maxFiles' | 'maxSize' | 'noClick'> & {
  /** Function called when files are dropped */
  onFileDrop: OnDropFunction
}

export function DropFileOverlay({
  onFileDrop,
  accept,
  maxSize,
  maxFiles,
  disableClickOpenFileDialog,
  children,
}: PropsWithChildren<DropFileOverlayProps>) {
  const onDrop = useCallback(onFileDrop, [onFileDrop]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    disableClickOpenFileDialog,

  });
  const showHint = !disableClickOpenFileDialog || isDragActive
  return (
    <>
      <section
        {...getRootProps()}
        className="grid place-content-center h-full w-full cursor-pointer [&>*]:hover:bg-blue-500"
      >
        <input {...getInputProps()} />
        {showHint && <UploadHintCard />}
      </section>
      {children}
    </>
  );
}
