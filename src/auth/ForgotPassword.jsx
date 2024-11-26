import React, { useState  , useEffect } from 'react'
import { getAuth , sendPasswordResetEmail } from 'firebase/auth'
import { app } from '../Firebase'
import { useNavigate , Link, useLocation } from 'react-router-dom'
import API_KEY from '../utils/_helper'
import axios from 'axios'

import SyncLoader from "react-spinners/SyncLoader";

import { Toaster, toast } from 'sonner'


const ForgotPassword = () => {
    const [ email, setEmail] = useState("")


    const [isResetPasswordLoading , setIsResetPasswordLoading] = useState(false)



    const navigate = useNavigate()
    

    const handleResetPassword =  () => {

        setIsResetPasswordLoading(true)

         
        const auth = getAuth(app)
       sendPasswordResetEmail(auth , email )
        .then(async(res) => {
            console.log(res)

            toast.success("Email sent successfully")

            setIsResetPasswordLoading(false)

            
        })
        .catch( err => {
          toast.error(err.message.substring(10))
          setIsResetPasswordLoading(false)
          console.log(err)
        })
    }


 
  return (
    <>
      <Toaster richColors  position="bottom-center" />
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="lg:w-1/2 xl:w-6/12 p-6 sm:p-12">
        <div>
          {/* <img
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
            className="w-32 mx-auto"
          /> */}
          <p className='text-center'>*company logo*</p>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">Reset Password</h1>
          <div className="w-full flex-1 mt-4">
           
            <div className="my-5 border-b text-center">
              <div className="leading-2 px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/3">
              Enter your email address below, and we'll send you a link to reset your password.
              </div>
            </div>
            <div className="mx-auto max-w-xs">
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Email"
                onChange={(e)=> setEmail(e.target.value)}
              />
             
              <button onClick={handleResetPassword} className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 custorm-btn-color w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              {         isResetPasswordLoading ?   (<SyncLoader size={8} color="#ffffff" />) :      
                (
                <>
                
                          <span className="ml-3">Send Email</span>
                </>)
                }
              </button>

              <Link to="/login"><p className='mt-3 cursor-pointer text-blue-700 custorm-text-color font-semibold'>want to go back?</p></Link>

             
            </div>
          </div>
        </div>
      </div>
    
    </div>
  </div>
    </>
  )
}

export default ForgotPassword