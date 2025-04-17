import { PropsWithChildren, useCallback } from "react";
import { useDropzone } from "react-dropzone";

function DropzoneOverlay({ children }: PropsWithChildren) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={"h-full w-full bg-green"}>
      <input {...getInputProps()} />
      {isDragActive
        ? <p>Drop the files here ...</p>
        : <p>Drag 'n' drop some files here, or click to select files</p>}
    </div>
  );
}

function App() {
  return (
    <section className={"h-dvh bg-red-500"}>
      <DropzoneOverlay>
        react-dropzone
      </DropzoneOverlay>
    </section>
  );
}

export default App;
