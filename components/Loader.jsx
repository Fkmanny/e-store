import React from 'react';
import { ReactDOM } from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal (
    <div className='mContainer'>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>    
    </div>,
    document.getElementById("loader")
  )
}

export default Loader