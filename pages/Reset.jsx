import React, { useState } from 'react'
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import Loadee from '../components/Loadee';
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
  .then(() => {
    setIsLoading(false);
    toast.success("Check your email for a reset link")
  })
  .catch((error) => {
    setIsLoading(false);
    toast.error(error.message);
  });
  }
  return (
    <>
    {isLoading && <Loadee/>}
    <div className='flex w-11/12 md:w-3/4 m-auto justify-between items-center mt-28'>


        <div className='w-full xl:w-2/5'>
          <section className='shadow-[0_10px_20px_rgba(0,0,0,0.2)] rounded-xl p-5 sm:p-7 md:p-10'>
            <h2 className='AoenikBold text-red-500 text-3xl md:text-4xl font-bold'>Forgot Password</h2>
            <p className='AoenikRegular text-[#515251]'>Please enter the email address associated with your account</p>

            <form onSubmit={resetPassword} className='flex flex-col pt-8'>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className=' bg-gray-100 rounded-md p-3 mb-2 ' placeholder='Email' type='email' required />
              <button type='submit' className=' bg-blue-900 rounded-md p-3 my-3 font-bold text-white hover:duration-300 hover:bg-blue-800'>Reset Password</button>
            </form>

            <span className='flex justify-between px-2 pt-4'>
              <Link href='/Login'><h3 className='underline flex items-center cursor-pointer'><FaArrowLeft /><span className='pl-1.5'>Login</span></h3></Link>
              <Link href='/Register'><h3 className='underline flex items-center cursor-pointer'><span className='pr-1.5'>Register</span><FaArrowRight /></h3></Link>
            </span>
          </section>
        </div>
        <img src='./images/reset.jpg' width={500} alt='login' className='hidden scale-90 lg:flex xl:scale-100'></img>
    </div>
    </>
  )
}

export default Reset