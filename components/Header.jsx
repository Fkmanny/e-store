import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { TiThMenuOutline } from 'react-icons/ti';
import { CgClose } from 'react-icons/cg';
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import {onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase/config';
import { useRouter } from 'next/router'
import useAuthStore from '../authStore';
import { Cart } from './';
import { useStateContext} from '../context/StateContext';



const logo = (
  <Link href="/">
    <div>
      <h1 className='logo-font font-semibold text-2xl text-blue-900'>
        <span className='font-bold text-blue-700 text-3xl'>E</span>
        -Store
      </h1>
    </div>
  </Link>
)



const Header = () => {

  const [showMenu, setShowMenu] = useState(false);
  const navigate = useRouter();
  const { isLoggedIn, emaill, usernamee, setIsLoggedIn, setEmail, setUsername } = useAuthStore();
  const [displayName, setDisplayName] = useState('');
  const { showCart, setShowCart, totalQuantities } = useStateContext();



  const toggleMenu = () => {
    setShowMenu(!showMenu);
    document.body.style.overflow = 'hidden';
  }
  const hideMenu = () => {
    setShowMenu(false);
    document.body.style.overflow = '';
  }

  function onOutsideClick(){
    setShowMenu(false);
    document.body.style.overflow = '';
  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Sign-out successful")
      navigate.push("/");
    }).catch((error) => {
      toast.error(error.message)
    });
  }

  const hideMenulogoutUser = () => {
    hideMenu();
    logoutUser(); 
  }

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoggedIn(true);
        setEmail(user.email)
        setUsername(user.displayName)
        
        if(user.displayName){
          setDisplayName(user.displayName);

        }else{
          // const email2 = emaill;
          // const editedEmail = email2.split('@')[0];
          setDisplayName((user.email).split('@')[0]);
        }
      } else {
        setIsLoggedIn(false);
        setDisplayName("");
        setEmail("");
        setUsername("");
      }
    });
  
  }, [2])

  const [logoutPopup, setLogoutPopup] = useState(false);

  const openLogoutPopup = () => {
    setLogoutPopup(!logoutPopup);
  }
  
  

  return (

    
    <div className='fixed z-50 bg-white w-full shadow-[0_10px_20px_rgba(0,0,0,0.02)]'>
    <div className='w-11/12 lg:w-11/12 flex flex-row justify-between py-3 m-auto text-center  items-center'>
      {logo}

      <nav className='hidden lg:flex w-3/5 justify-between items-center'>

        <ul className='flex gap-4 xl:gap-12 items-center'>
          <li className='h3 cursor-pointer hover:text-red-600 hover:duration-500'>
            <Link href="/"><span className="AoenikRegular" >Home</span></Link>
          </li>
          <li className='h3 cursor-pointer hover:text-red-600 hover:duration-500'>
            <Link href="/"><span className="AoenikRegular" >Contact Us</span></Link>
          </li>
          <li className='h3 cursor-pointer hover:text-red-600 hover:duration-500'>
            <Link href="/"><span className="AoenikRegular" >About</span></Link>
          </li>
          {/* {isLoggedIn && 
          <li className='h3 cursor-pointer hover:text-red-600 hover:duration-500'>
            <Link href="/"><span className="AoenikRegular" onClick={logoutUser}>Logout</span></Link>
          </li>
          } */}
        </ul>

        {/* className=' hover:text-[#515251]' */}
        <span className='flex gap-10 items-center'>
          {!displayName &&
          <Link href="Login">
            <span className="AoenikRegular h3 cursor-pointer py-2 px-10 border-blue-900 border-2 shadow-md rounded-3xl  hover:border-gray-100 hover:duration-300 hover:text-[#515251] hover:bg-gray-100 ">Login</span></Link>
          }
          {displayName && 
          <Link href=''>
            <span>
              <span onClick={openLogoutPopup} className={`${logoutPopup ? ' scale-110' : ''} cursor-pointer flex items-center`}>
                <FaUserCircle size={20} className='mr-2 text-gray-500' />
                Hi, {displayName}
              </span>
              {logoutPopup && 
              <span className='relative'>
                <Link href='/'>
                  <h3 onClick={logoutUser} className='absolute top-3 cursor-pointer w-full m-auto AoenikBold py-2.5 px-14 pr-28 text-center rounded-xl bg-red-500 shadow-xl border-transparent border-2 text-white hover:border-gray-100 hover:duration-500 hover:text-black hover:bg-gray-100'>
                          <span className="AoenikBold" >Logout</span>
                  </h3>
                </Link>
              </span>
}
            </span>
          </Link>
}           
          {!displayName && 
          <Link href="/Register" >
            <span className="AoenikRegular cursor-pointer py-2 px-10 rounded-3xl bg-blue-900 shadow-md border-2 text-white hover:border-gray-100 hover:duration-300 hover:text-[#515251]  hover:bg-gray-100">Register</span></Link>
          }
          <button type='button' onClick={() => setShowCart(true)} href="/" className='flex gap-0.7 pt-0 text-blue-900 '>
            <span className='flex hover:duration-300 hover:scale-110 cursor-pointer'>
              <FaShoppingCart size={34} className='pt-1.5 text-blue-800'/>
              <p className=' text-lg font-bold text-blue-500'>{totalQuantities}</p>
            </span>
          </button>
        </span>
      </nav>

      <div className='flex gap-3 lg:hidden hover:cursor-pointer'>

        {/* ------------CART-------------- */}

      <button type='button' onClick={() => setShowCart(true)} href="/" className='flex gap-0.7  pt-0 mt-0  text-blue-900 '>
        <span className='flex hover:duration-300 hover:scale-110 cursor-pointer'>
          <FaShoppingCart size={34} className='pt-1.5 text-blue-800'/>
          <p className=' text-lg font-bold text-blue-500'>{totalQuantities}</p>
        </span>
      </button>

      {/* ----------------------------------------- */}

        <TiThMenuOutline size={38} onClick={toggleMenu} className='pt-2 text-blue-800 hover:drop-shadow-[0_2px_1px_rgba(0,0,0,0.1)]' />
      </div>

       <div onClick={onOutsideClick} className={`${showMenu ? 'absolute' : 'hidden'}  right-0 top-0 w-screen h-screen backdrop-blur-sm`}>
          <div onClick={(e) => e.stopPropagation()} className='absolute smalls z-500 right-2 top-4 rounded-lg bg-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] w-64 py-4 pb-7 px-1'>
            <span className='flex justify-between px-2.5 mb-7'>
              {logo}
              <CgClose onClick={hideMenu} size={30} className='pt-1.5 text-[#11453b] hover:cursor-pointer hover:text-red-600 hover:drop-shadow-[0_2px_1px_rgba(0,0,0,0.1)]' />
            </span>
            {displayName && 

            <span className={`pl-3 mb-5 cursor-pointer font-semibold flex items-center`}>
                <FaUserCircle size={20} className='mr-2 text-gray-500' />
                Hi, {displayName}
              </span>
            }
            <ul className='text-start pl-4'>
              <li>
                <Link href="/" >
                    <h3 className=' cursor-pointer h3 py-1.5 AoenikBold hover:text-red-600 hover:duration-300'>
                      <span className="AoenikBold" onClick={hideMenu}> Home</span>
                    </h3>
                </Link>
              </li>
              <li>
                <Link href="Contact" >
                    <h3 className='h3 cursor-pointer py-1.5 AoenikBold hover:text-red-600 hover:duration-300'>
                    <span className="AoenikBold" onClick={hideMenu}> Contact Us</span>
                    </h3>
                </Link>
              </li>
              <li>
                <Link href="About" >
                    <h3 className='h3 cursor-pointer py-1.5  hover:text-red-600 hover:duration-300'>
                      <span className="AoenikBold" onClick={hideMenu}> About</span>
                    </h3>
                </Link>
              </li>
              {displayName ? "" : 

              <li >
                <Link href="Login" >
                    <h3 onClick={hideMenu} className='h3 cursor-pointer my-10  hover:text-red-600 hover:duration-300'>
                      <span className="AoenikBold" onClick={hideMenu}>Login</span>
                    </h3>
                </Link> 
              </li>
              }
              {displayName && 

              <li >
                <Link href="/" >
                    <h3  className='h3 cursor-pointer my-10  hover:text-red-600 hover:duration-300'>
                      <span className="AoenikBold" onClick={hideMenulogoutUser}>Logout</span>
                    </h3>
                </Link>
              </li>
              }
            </ul>

            <span>
          {!displayName &&  
              <Link href="Register" >
                      <h3 className=' cursor-pointer w-11/12 m-auto AoenikBold py-2.5 px-10 rounded-3xl bg-blue-900 shadow-xl border-transparent border-2 text-white hover:border-gray-100 hover:duration-500 hover:text-black hover:bg-gray-100'>
                        <span className="AoenikBold" onClick={hideMenu}>Register</span>
                      </h3>
              </Link>
}
            </span>
          
          </div>
        </div>
 
        {showCart && <Cart />}
    </div>
    </div>

  )
}

export default Header