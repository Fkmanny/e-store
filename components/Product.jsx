import React, { useState } from 'react';
import Link from 'next/link';
import  Loadee  from '../components/Loadee';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const load = () => {
    setIsLoading(true);
  }
  return (
    <>
    {isLoading && <Loadee/>}
    <div onClick={load}>
      <Link href={`/${slug.current}`}>
        <div className="product-card">
          <img 
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
    </>

  )
}

export default Product