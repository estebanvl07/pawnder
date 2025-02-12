import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface FilesContextProps {
  files: string[];
  setFiles: Dispatch<SetStateAction<string[]>>;
}

const FilesContext = createContext<FilesContextProps | null>(null);

const FilesProvider = ({ children }: { children: React.ReactNode }) => {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <FilesContext.Provider value={{ files, setFiles }}>
      {children}
    </FilesContext.Provider>
  );
};

export const useFilesContext = () => {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error("useFilesContext must be used within a FilesProvider");
  }
  return context;
};

export default FilesProvider;
