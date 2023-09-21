import React from "react"

interface ToggleProps {
      onChangeHandler: () => void
      checked: boolean
      className?: string
}

export const Toggle: React.FC<ToggleProps> = ({ onChangeHandler, checked, className }) => {
      return (
            <label className={"relative inline-flex items-center cursor-pointer " + className}>
                  <input type="checkbox" value="" className="sr-only peer" checked={checked} onChange={() => onChangeHandler()}/>
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-400"></div>
            </label>
      );
}