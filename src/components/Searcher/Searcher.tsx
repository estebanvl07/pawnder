import { Input } from "@heroui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import useSearcher from "~/hooks/useSearcher";

const Searcher = () => {
  const { query, setQuery } = useSearcher();

  return (
    <div className="mb-2 mt-2 px-2 md:px-0">
      <Input
        placeholder="Busca"
        size="lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        startContent={
          <span>
            <Icon icon="mynaui:search" width={20} />
          </span>
        }
      />
    </div>
  );
};

export default Searcher;
