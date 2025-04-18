import { useCallback, useState } from "react";
import { DropFileOverlay } from "./ui/dnd/drop-file-overlay.tsx";
import Editor from "./ui/editor";

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
        <Editor files={files} />
      </DropFileOverlay>
    </section>
  );
}

export default App;
