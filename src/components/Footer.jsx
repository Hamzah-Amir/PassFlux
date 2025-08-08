import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col sticky bottom-0 w-full gap-2 items-center bg-purple-300 py-2'>
            <div className='font-bold text-3xl my-[-6px]'>
                <span className='text-purple-700'>&lt;</span>
                Pass
                <span className='text-purple-800'>Flux/&gt;
                </span>
            </div>
            <p className='font-bold text-sm'>Created by Hamza</p>
        </div>
    )
}

export default Footer