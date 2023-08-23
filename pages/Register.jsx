import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

import  Loadee  from '../components/Loadee';
import { useRouter } from 'next/router';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();

  const registerUser = (e) => { 
    e.preventDefault();
    if(password !== cPassword){
      toast.error("Passwords no not match")
    }
    else{
      setIsLoading(true);
    
      createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setIsLoading(false);
      toast.success("Registration successful");
      navigate.push("/Login");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(error.message);
      setIsLoading(false);
    });
  }

   }

  return (
    <>
    {isLoading && <Loadee/>}
  <div className='flex  w-11/12 md:w-3/4 m-auto justify-between items-center mt-28'>
    <div className='w-full xl:w-2/5'>
      <section className='shadow-[0_10px_20px_rgba(0,0,0,0.2)] rounded-xl p-5 sm:p-7 md:p-10'>
        <h2 className='AoenikBold text-red-500 text-3xl md:text-4xl font-bold'>Welcome to E-Store</h2>
        <p className='AoenikRegular text-[#515251]'>Please signup to get started</p>

        <form onSubmit={registerUser} className='flex flex-col pt-8'>
          <input className=' bg-gray-100 rounded-md p-3 ' placeholder='Email' type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className=' bg-gray-100 rounded-md p-3 my-2' placeholder='Password' type='password' required  value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className=' bg-gray-100 rounded-md p-3 ' placeholder='Confirm Password' type='password' required   value={cPassword} onChange={(e) => setCPassword(e.target.value)}/>
          <button type='submit' className=' bg-blue-900 rounded-md p-3 my-3 mt-4 font-bold text-white hover:duration-300 hover:bg-blue-800'>Register</button>
        </form>

        <span className='flex justify-center'>
          <p className='pr-2'>Already have an account?</p>
          <Link href='/Login'><h3 className='underline cursor-pointer'>Login</h3></Link>
        </span>
      </section>
    </div>
    <img src='./images/register.jpg' width={500} alt='login' className='hidden scale-90 lg:flex xl:scale-100 '></img>

  </div>
  </>
  )
}

export default Register