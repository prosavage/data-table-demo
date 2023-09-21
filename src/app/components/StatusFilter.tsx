import React, { useEffect, useRef, useState } from "react"

interface StatusFilterProps {
      filter: string | undefined
      onFilter: (marketStatus: string) => void
      label: string
      options: string[]
      className?: string
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ onFilter, label, options, className, filter }) => {
      const [hidden, setHidden] = useState<boolean>(true)

      // Used to close the dropdown when clicked outside.
      const wrapperRef = useRef<HTMLDivElement | null>(null);

      useEffect(() => {
            function handleClickOutside(event: any) {
                  if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                        setHidden(true);
                  }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                  document.removeEventListener("mousedown", handleClickOutside);
            };
      }, [wrapperRef]);


      const getOptions = () => {
            const opts = [...options.map((opt) => opt.toUpperCase())]
            if (filter) {
                  opts.push("CLEAR")
            }

            return opts
      }

      return (
            <div className={"relative inline-block text-left " + className} onClick={() => setHidden(!hidden)} ref={wrapperRef}>
                  <div>
                        <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                              {filter ? filter : label}
                              <svg className="mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                              </svg>
                        </button>
                  </div>


                  <div className="relative">
                        <div hidden={hidden} className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                              <div className="py-1" role="none">
                                    {getOptions().map((option, i) =>
                                          <a
                                                className="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm font-mono"
                                                role="menuitem"
                                                key={"menu-item-" + i + "-" + option}
                                                onClick={() => onFilter(option)}
                                          >
                                                {option}
                                          </a>)
                                    }
                              </div>
                        </div>
                  </div>
            </div>
      );
}