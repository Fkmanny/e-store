import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const cancelled = () => {
    const router = useRouter();
    useEffect(() => {
        // Redirect logic here
        router.push('/');
      }, []);
  return (
    <></>
  )
}

export default cancelled