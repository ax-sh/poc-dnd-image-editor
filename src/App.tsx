import { useCallback, useRef, useState } from "react";
import { DropFileOverlay } from "./drop-file-overlay.tsx";
// Type for file with its URL
interface FileWithUrl {
  file: File;
  id: string;
}

function App() {
  const [files, setFiles] = useState<FileWithUrl[]>([]);
  const fileCounter = useRef(0);

  // Handle file drops
  const handleFileDrop = useCallback((droppedFiles: File[]) => {
    console.debug("Dropped files:", droppedFiles);

    setFiles((prevFiles) => [
      ...prevFiles,
      ...droppedFiles.map((file) => ({
        file,
        id: `file-${fileCounter.current++}-${file.name}`, // Generate unique ID
      })),
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
