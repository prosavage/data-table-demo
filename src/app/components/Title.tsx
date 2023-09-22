import React from "react"

interface TitleProps {

}

export const Title: React.FC<TitleProps> = ({ }) => {
      return <div className="p-3 sm:p-0">
            <p className="text-2xl font-bold">Data Table Demo</p>
            <p className="text-md font-medium">Naman Gupta</p>
      </div>;
}