import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Canceled = () => {
  const router = useRouter();
  useEffect(() => {
      // Redirect logic here
      router.push('/');
  }, []);
  
  return (
      <div></div>
  )
}

export default Canceled;