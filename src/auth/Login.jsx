import React, { useState  , useEffect } from 'react'
import { getAuth , signInWithEmailAndPassword , signInWithPopup , GoogleAuthProvider } from 'firebase/auth'
import { app } from '../Firebase'
import { useNavigate , Link, useLocation } from 'react-router-dom'
import API_KEY from '../utils/_helper'
import axios from 'axios'

import SyncLoader from "react-spinners/SyncLoader";

import { Toaster, toast } from 'sonner'


const Login = () => {

    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState(null)

    const [ isUserAlreadyExist , setIsUserAlreadyExist] = useState(null)

    const [isLogInLoading , setIsLogInLoading] = useState(false)

    const [isLogInGoogleLoading , setIsLogInGoogleLoading] = useState(false)




    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      
     if(location.state && location.state.isEmailVerificationSent){
        toast.info("Email verification is sent on your mail. Please verify and log in.")

     }
      
    }, [location.state])
    

    const handleSignUp =  () => {

      setIsLogInLoading(true)

        console.log(email, password)
        const auth = getAuth(app)
       signInWithEmailAndPassword(auth , email , password)
        .then(async(res) => {
            console.log(res.user)

            if(res.user.emailVerified === true){
                

                //  axios.post(`${API_KEY}api/save-user-mongodb` , {
                //     email : res.user.email,
                //     // userId : res.user.id
                // })

                try {
                    await axios.post(`${API_KEY}api/save-user-mongodb`, {
                      email: res.user.email,
                      userId: res.user.uid,
                    });
                    navigate('/dashboard'); // Redirect to dashboard after successful verification and saving
                  } catch (error) {
                    console.error('Failed to save user:', error);
                  }
                
                toast.success("Log in successful")
                navigate('/create-note')
            }else{
                
                toast.error("Please verify your email first")
            }

            setIsLogInLoading(false)

            
        })
        .catch( err => {
          toast.error(err.message.substring(10))
          setIsLogInLoading(false)
          console.log(err)
        })
    }



    const handleLoginWithGoogle = () => {
      setIsLogInGoogleLoading(true)
        const auth = getAuth(app)

        const provider = new GoogleAuthProvider()

        signInWithPopup(auth , provider)
        .then(async(res)=>{
            console.log(res.user)
            toast.success("Log in successful")


            
            // write code to check if user already exists or not
            try {

              const checkUser = await axios.post(`${API_KEY}api/check-user`, { email : res.user.email})
              console.log(checkUser.data)
              setIsUserAlreadyExist(checkUser.data.user)
              console.log(isUserAlreadyExist)


            } catch (error) {
               console.log(error)
            }


            if( !isUserAlreadyExist ){

              console.log("the user is new and signed in with google")
              try {
                await axios.post(`${API_KEY}api/save-user-mongodb`, {
                  email: res.user.email,
                  userId: res.user.uid,
                });

                toast.success("Log in successful")
                navigate('/create-note'); // Redirect to dashboard after successful verification and saving
              } catch (error) {
                console.error('Failed to save user:', error);
              }

            }

            setIsLogInGoogleLoading(false)
            navigate('/create-note')
        })
        .catch( err => {
          setIsLogInGoogleLoading(false)
          toast.error("Log in failed, Try again later")
          console.log(err)
        }
        )

    }

  return (
    
        <>
         <Toaster richColors  position="bottom-center" />
        
  {/* source:https://codepen.io/owaiswiz/pen/jOPvEPB */}
  <div className="max-h-screen bg-gray-100 text-gray-900 flex justify-center">
 
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div>
          {/* <img
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
            className="w-32 mx-auto"
          /> */}
          <p className='text-center'>*company logo*</p>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">Log In</h1>
          <div className="w-full flex-1 mt-8">
            {/* <div className="flex flex-col items-center">
              <button onClick={handleLoginWithGoogle} className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                <div className="bg-white p-2 rounded-full">
                  <svg className="w-4" viewBox="0 0 533.5 544.3">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                </div>
                <span className="ml-4">
                {
                  isLogInGoogleLoading ? <SyncLoader color="#fff" size={8} /> : "Log in with Google"
         }
                </span>
              </button>
             
            </div> */}
            {/* <div className="my-6 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or Log in with e-mail
              </div>
            </div> */}
            <div className="mx-auto max-w-xs">
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Email"
                onChange={(e)=> setEmail(e.target.value)}
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                placeholder="Password"
                onChange={(e)=> setPassword(e.target.value)}
              />
              <button onClick={handleSignUp} className="mt-5 tracking-wide font-semibold  w-full py-4 rounded-lg custorm-btn-color transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">

         {         isLogInLoading ?   (<SyncLoader size={8} color="#ffffff" />) :      
                (
                <>
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy={7} r={4} />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                          <span className="ml-3">Log In</span>
                </>)
                }

              </button>


              <Link to="/forgot-password"><p className='my-3 cursor-pointer  text-[15px] custorm-text-color font-semibold'>Forgot Password</p></Link>


              <Link to="/signup"><p className='mt-0 cursor-pointer text-blue-700 custorm-text-color font-semibold'>Create a New Account ?</p></Link>

              <p className="mt-6 text-xs text-gray-600 text-center">
                I agree to abide by {" "}
                <a href="https://merchant.razorpay.com/policy/OGIvXKXYd4U1Av/terms" target='_blank' className="border-b border-gray-500 border-dotted">
                  Terms of Service
                </a>{" "}
                {/* and its
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Privacy Policy
                </a> */}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")'
          }}
        ></div>
      </div>
    </div>
  </div>
</>

    
  )
}

export default Login