import React from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = () => {
  return (
     <>
      <div className='h-screen flex items-center justify-center'>
      <PacmanLoader color="#000000" />
      </div>
        
     </>
  )
}

export default Loader