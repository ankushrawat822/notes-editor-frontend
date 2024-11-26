import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './component/Dashboard'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import PrivateRoutes from './routes/PrivateRoutes'
import Home from './component/Home'
import Navbar from './common/Navbar'
import PaymentSuccess from './payment/PaymentSuccess'
import ForgotPassword from './auth/ForgotPassword'

import CreateNote from './component/CreateNote'
import Test from './component/Test'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element :  <><Navbar></Navbar><Home></Home></>,
    },
     {
       path: '/create-note',
       element : <PrivateRoutes element={<><Navbar></Navbar><CreateNote /></>} />,
     },

     // auth
     {
      path : 'login',
      element :  <Login></Login>
     },
     {
      path : 'signup',
      element :  <SignUp></SignUp>
     },
     {
      path : 'payment-success',
      element :  <PaymentSuccess></PaymentSuccess>
     },
     {
      path : 'forgot-password',
      element :  <ForgotPassword></ForgotPassword>
     },

     // notes 
    //  {
    //   path : '/create-note',
    //   element :  <CreateNote></CreateNote>
    //  },

     {
      path : '/test',
      element :  <Test></Test>
     },

    
  ])

  return (
    <>
     
      <RouterProvider router={router}></RouterProvider>

 
    </>
  )
}

export default App
