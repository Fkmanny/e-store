import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase/config';
import { useRouter } from 'next/router';
import  Loadee  from '../components/Loadee';
import { GoogleAuthProvider } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();
  

  const loginUser = (e) => { 
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setIsLoading(false);
    toast.success("Login Successful");
    navigate.push("/");
  })
  .catch((error) => {
    setIsLoading(false);
    const errorMessage = error.message;
    toast.error(error.message)
  });
   }


  const provider = new GoogleAuthProvider();
  const signInGoogle = () =>{
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      toast.success("Login Succesful");
      navigate.push("/")
    }).catch((error) => {
      toast.error(error.message)
    });
  }

  return (
    <>
    {isLoading && <Loadee/>}
    <div className='flex w-11/12 md:w-3/4 m-auto justify-between items-center mt-28'>
    <img src='./images/login.jpg' width={500} alt='login' className='hidden scale-90 lg:flex xl:scale-100'></img>


        <div className='w-full xl:w-2/5'>
          <section className='shadow-[0_10px_20px_rgba(0,0,0,0.2)] rounded-xl p-5 sm:p-7 md:p-10'>
            <h2 className='AoenikBold text-red-500 text-3xl md:text-4xl font-bold'>Welcome Back</h2>
            <p className='AoenikRegular text-[#515251]'>Please enter your login details</p>

            <form onSubmit={loginUser} className='flex flex-col pt-8'>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className=' bg-gray-100 rounded-md p-3 mb-2 ' placeholder='Email' type='email' required />
              <input value={password} onChange={(e) => setPassword(e.target.value)} className=' bg-gray-100 rounded-md p-3 ' placeholder='Password' type='password' required />
              <button type='submit' className=' bg-blue-900 rounded-md p-3 my-3 font-bold text-white hover:duration-300 hover:bg-blue-800'>Login</button>
              <Link className='' href='/Reset'><h3 className='pl-1 text-left cursor-pointer hover:underline'>Forgot Password?</h3></Link>
              <p className='font-semibold text-lg my-1.5 text-center'>-- or --</p>
            </form>

            {/* <button className='flex w-full justify-center text-gray-500 border-2 border-gray-200 rounded-md p-3 my-3 font-semibold hover:duration-300 hover:bg-gray-200'><FcGoogle size={25}/><span className='ml-2'>Sign in with Google</span></button> */}
            <button onClick={signInGoogle} className='flex w-full justify-center text-gray-700 border-2 border-gray-300 rounded-md p-3 my-3 font-bold hover:duration-300 hover:bg-gray-200'><FcGoogle size={25}/><span className='ml-2'>Sign in with Google</span></button>
            <span className='flex justify-center'>
              <p className='pr-2'>Don't have an account?</p>
              <Link href='/Register'><h3 className='underline cursor-pointer'>Register</h3></Link>
            </span>
          </section>
        </div>
    </div>
    </>
  )
}

export default Login;