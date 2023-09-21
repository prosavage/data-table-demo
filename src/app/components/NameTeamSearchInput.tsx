import React from "react"
import { AiOutlineSearch } from "react-icons/ai";

interface NameTeamSearchInputProps {
      onQuery: (query: string) => void
}

export const NameTeamSearchInput: React.FC<NameTeamSearchInputProps> = ({ onQuery }) => {
      return (
            <div className="w-full sm:w-64 my-1">
                  <div className="relative rounded-md shadow-sm w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <AiOutlineSearch />
                        </div>
                        <input type="text"
                              placeholder={"Search by team or player"}
                              className="block w-full rounded-md border-0 py-1.5 pl-9 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                              onChange={(e) => onQuery(e.target.value)}
                        />
                  </div>
            </div>
      );
}