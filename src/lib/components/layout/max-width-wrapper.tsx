import React, {ReactNode} from 'react'

export default function MaxWidthWrapper({children}: {children: ReactNode}) {
  return (
    <div className="mx-auto w-full h-full max-w-7xl px-4 md:px-10">
      {children}
    </div>
  )
}
