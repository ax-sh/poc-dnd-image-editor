import { useCallback, useState } from "react";
import { DropFileOverlay } from "./ui/drop-file-overlay.tsx";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  // Handle file drops
  const handleFileDrop = useCallback((droppedFiles: File[]) => {
    console.debug("Dropped files:", droppedFiles);

    setFiles((prevFiles) => [
      ...prevFiles,
      ...droppedFiles,
    ]);
  }, []);
  return (
    <section className={"h-dvh"}>
      <DropFileOverlay
        onFileDrop={handleFileDrop}
        disableClickOpenFileDialog={!!files.length}
      >
        <pre>
           {JSON.stringify(files,null,5)}
        </pre>
      </DropFileOverlay>
    </section>
  );
}

export default App;
