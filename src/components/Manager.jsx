import { React, useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form'

const Manager = () => {
    const [form, setForm] = useState({ id: uuidv4(), site: "", username: "", password: "" })
    const ref = useRef()
    const inpRef = useRef()
    const [passwordArray, setPasswordArray] = useState([])

    const showPassword = () => {
        if (ref.current.src.includes('/eye.svg')) {
            ref.current.src = '/hidden.png'
            inpRef.current.type = "password"
        }
        else {
            ref.current.src = '/eye.svg'
            inpRef.current.type = "text"
        }
    }

    useEffect(() => {
        let passwordArray;
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
        else {
            setPasswordArray([])
        }

    }, [])


    const copyText = async (text) => {
        await navigator.clipboard.writeText(text)
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
        });
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            toast('Password Saved Successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
        });
        } 
    }

    const deletePassword = (id) => {
        console.log("deleting passwrod of id:", id)
        let confirmation = confirm("Are you sure you want to delete password:")
        if (confirmation === true) {
            let newPassword = passwordArray.filter(item => { return (item.id !== id) })
            setPasswordArray(newPassword)
            localStorage.setItem("passwords", JSON.stringify(newPassword))
            toast('Password Deleted Successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
        });
        }
    }

    const editPassword = (id) => {
        console.log("Editing password of id:", id)
        setForm(passwordArray.filter(item => { return item.id === id })[0])
        let newPassword = setPasswordArray(passwordArray.filter(item => { return (item.id !== id) }))
        localStorage.setItem("passwords", JSON.stringify(newPassword))
    }


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="absolute inset-0 -z-10 w-full min-h-screen bg-purple-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-purple-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="md:container p-2 md:my-5 md:mx-auto md:w-4xl">
                <h1 className=' text-3xl text-center font-bold'><span className='text-purple-700'>&lt;</span>
                    Pass
                    <span className='text-purple-800'>Flux/&gt;
                    </span></h1>
                <p className='text-purple-600 text-lg text-center'>You own password manager</p>

                <div className='flex flex-col items-center text-black gap-4'>
                    <input value={form.site} name='site' placeholder='Enter website URL' onChange={handleChange} className='my-2.5 focus:outline-none rounded-full bg-white w-full  px-3 py-1' type="text" />
                    { }
                    <div className='flex flex-col sm:flex-row w-full justify-around gap-5'>
                        <input value={form.username} name='username' placeholder='Enter username' onChange={handleChange} className='bg-white focus:outline-none rounded-2xl w-full md:w-1/2  px-3 py-0.5' type="text" />
                        <div className="relative">
                            <input ref={inpRef} value={form.password} name='password' placeholder='Enter password' onChange={handleChange} className='bg-white focus:outline-none rounded-2xl w-full md:w-[400px]  px-3 py-0.5' type="password" />
                            <span className='absolute right-3 my-[5px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={20} src="/hidden.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex cursor-pointer gap-1.5 justify-center items-center  w-fit hover:bg-purple-200 px-4 py-1 bg-purple-300 rounded-full'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password
                    </button>
                </div>
                <div className="passwords max-h-[50vh] overflow-x-auto">
                    <h1 className='font-bold text-2xl text-purple-400 py-5'>Your Passwords</h1>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-lg overflow-hidden">
                        <thead className='bg-purple-400 text-white'>
                            <tr>
                                <th>Website</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-purple-100'>
                            {passwordArray.map(item => {
                                return <tr>
                                    <td className='py-1.5 flex border border-white min-w-35'>
                                        <div className='flex justify-between items-center w-full'>
                                            <a className='mx-auto' href={item.site} target='_blank'>{item.site}</a>
                                            <button onClick={() => copyText(item.site)}><img src="/copy.png" className='cursor-pointer mr-2' width={18} alt="" /></button>
                                        </div>
                                    </td>

                                    <td className='py-1.5 border border-white text-center min-w-35'>{item.username}</td>

                                    <td className='py-1.5 flex border border-white min-w-35'>
                                        <span className='w-full mx-auto text-center'>{item.password}</span>
                                        <button onClick={() => copyText(item.password)}><img src="/copy.png" className='mr-2 cursor-pointer' width={18} alt="" /></button>
                                    </td>

                                    <td className='text-center'>
                                        <div className='gap-1 flex items-center justify-center'>
                                            <span onClick={() => { editPassword(item.id) }}><img className='cursor-pointer' src="/edit.png" width={20} alt="edit icon" />
                                            </span>
                                            <span onClick={() => { deletePassword(item.id) }}><img className='cursor-pointer' src="/delete.png" width={20} alt="delete icon" /></span>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </>

    )
}

export default Manager