import { User } from "@prisma/client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { PostIncludes } from "~/components/Post/types/post";

interface SearcherContextProps {
  posts: PostIncludes[];
  users: User[];
  isLoading: boolean;
  setPosts: Dispatch<SetStateAction<PostIncludes[]>>;
  setUsers: Dispatch<SetStateAction<User[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const SearcherContext = createContext<SearcherContextProps | null>(null);

const SearcherProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostIncludes[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <SearcherContext.Provider
      value={{ posts, users, isLoading, setPosts, setUsers, setIsLoading }}
    >
      {children}
    </SearcherContext.Provider>
  );
};

export const useSearcherContext = () => {
  const context = useContext(SearcherContext);
  if (!context) {
    throw new Error(
      "useSearcherContext must be used within a SearcherProvider",
    );
  }
  return context;
};

export default SearcherProvider;
