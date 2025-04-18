import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

export interface FileDropContextState {
  files: File[];
  addFiles: (newFiles: File[]) => void;
  clearFiles: () => void;
  removeFile: (index: number) => void;
}

const FileDropContext = createContext<FileDropContextState | undefined>(
  undefined,
);

interface FileDropProviderProps {
  initialFiles?: File[];
}

export const FileDropProvider = ({
  children,
  initialFiles = [],
}: PropsWithChildren<FileDropProviderProps>) => {
  const [files, setFiles] = useState<File[]>(initialFiles);

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }, []);

  const value = {
    files,
    addFiles,
    clearFiles,
    removeFile,
  };

  return (
    <FileDropContext.Provider value={value}>
      {children}
    </FileDropContext.Provider>
  );
};

export const useFileDropContext = (): FileDropContextState => {
  const context = useContext(FileDropContext);

  if (context === undefined) {
    throw new Error(
      "useFileDropContext must be used within a FileDropProvider",
    );
  }

  return context;
};

//export const DropFileWrapper: React.FC = () => {
//   return (
//     <FileDropProvider>
//       <DropFileContent />
//     </FileDropProvider>
//   );
// };
// -----
//const DropFileContent: React.FC = () => {
//   const { files } = useFileDropContext();
//
//   return (
//     <DropFileOverlay disableClickOpenFileDialog={!!files.length}>
//       {/* Your file drop UI content here */}
//       {files.length > 0 ? (
//         <div>
//           <p>Files uploaded: {files.length}</p>
//           {/* File list rendering */}
//         </div>
//       ) : (
//         <p>Drop files here</p>
//       )}
//     </DropFileOverlay>
//   );
// };
