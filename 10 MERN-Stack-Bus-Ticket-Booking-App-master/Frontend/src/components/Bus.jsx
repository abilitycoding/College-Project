import React from 'react'
import {useNavigate} from 'react-router-dom'
function Bus({bus}) {
    const navigate = useNavigate()
    console.log(bus)
  return (
    <div className='card p-3 mt-2'>
        <h1 className='text-lg primary-text'><b>{bus.name}</b></h1>
        <hr />
        <div className="d-flex justify-content-between gap-2">
            <div>
                <p className='text-sm'>From : </p>
                <p className='text-sm'>{bus.from}</p>
            </div>
            <div>
                <p className='text-sm'>To : </p>
                <p className='text-sm'>{bus.to}</p>
            </div>
            <div>
                <p className='text-sm'>Fare : </p>
                <p className='text-sm'>${bus.fare}/-</p>
            </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-end">
        <div>
                <p className='text-sm'>Journey Date : </p>
                <p className='text-sm'>{bus.journeyDate}</p>
            </div>
            <h1 className='text-md underline secondary-text' onClick={() => {
                navigate(`/book-now/${bus._id}`)
            }}> <b>BOOK NOW </b> </h1>
        </div>
    </div>
  )
}

export default Bus