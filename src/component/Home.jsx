import React from "react";
import { Link } from "react-router-dom";


const Home = () => {

  return (
    <>
        <p className="text-center text-[34px] my-10">Home Page</p>
        <button><Link to="/create-note">Create Note</Link></button>
       
    </>
  )
}

export default Home


