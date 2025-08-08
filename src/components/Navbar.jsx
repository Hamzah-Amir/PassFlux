import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-purple-300 text-white text-xl flex justify-between p-5'>
            <div className="logo font-bold text-2xl">
                <span className='text-purple-700'>&lt;</span>
                Pass
                <span className='text-purple-800'>Flux/&gt;
                </span>
            </div>
            <ul className='flex gap-8 '>
                <li><a className='hover:font-bold' href="/">Home</a></li>
                <li><a className='hover:font-bold' href="/about">About</a></li>
            </ul>
        </nav>
    )
}

export default Navbar