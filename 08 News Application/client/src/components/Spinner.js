import React from 'react'
import SpinnerImg from './loading.gif'

export default function Spinner() {
    return (
      <div className='text-center mt-3'>
        <img src={SpinnerImg} alt="Spinner.." />
      </div>
    )
  
}
