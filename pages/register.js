import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import redirectIfAuthenticated from '../components/redirectIfAuthenticated'
import { setLoggedInUser } from '../store/actions'

import axios from 'axios'

const Register = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        if(password !== confirmPassword) {
            setErrors({
               c_password: { message: 'Passwords don\'t match'}
            })
            
            return
        }
        axios.post('/api/users', {
            name,
            email,
            password
        })
        .then(response => {
            dispatch(setLoggedInUser(response.data.user))
            router.push('/dashboard')
        })
        .catch(error => {
            if (error.response.data.errors)  {
                setErrors(error.response.data.errors)
            } else {
                setErrors({
                    generic: { message: 'There was an error processing your request. Please try again later'}
                })
            }
        })
    }

    const clearError = (field) => {
        setErrors({...errors, generic: null})
        if (errors[field]) {
            setErrors({...errors, [field]: null});
        }

    }

    return (
        <div className="bg-gray-400">
           
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    
                    <div className="flex w-full xl:w-3/4 lg:w-11/12">
                       
                        <div
                            className="hidden w-full h-auto bg-gray-400 bg-cover rounded-l-lg lg:block lg:w-5/12"
                        ></div>
                      
                        <div className="w-full p-5 bg-white rounded-lg lg:w-7/12 lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        onFocus={e => clearError(e.target.id)}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border ${errors.name ? "border-red-500" : ""} rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                                        id="name"
                                        type="name"
                                        placeholder="Name"
                                    />
                                    { errors.name &&  <p className="text-xs italic text-red-500">{errors.name.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        onFocus={e => clearError(e.target.id)}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border ${errors.email ? "border-red-500" : ""} rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                    { errors.email &&  <p className="text-xs italic text-red-500">{errors.email.message}</p>}
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            onFocus={e => clearError(e.target.id)}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border ${errors.password ? "border-red-500" : ""} rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                                            id="password"
                                            type="password"
                                            placeholder="******************"
                                        />
                                        { errors.password &&  <p className="text-xs italic text-red-500">{errors.password.message}</p>}
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                                            Confirm Password
                                        </label>
                                        <input
                                            onFocus={e => clearError(e.target.id)}
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border ${errors.c_password ? "border-red-500" : ""} rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                                            id="c_password"
                                            type="password"
                                            placeholder="******************"
                                        />
                                        { errors.c_password &&  <p className="text-xs italic text-red-500">{errors.c_password.message}</p>}
                                    </div>
                                </div>
                                { errors.generic &&  <p className="text-xs italic text-red-500">{errors.generic.message}</p>}
                                <div className="mb-6 text-center">
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Register Account
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <Link href="#">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    >
                                        Forgot Password?
                                    </a>
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link href="login">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    >
                                        Already have an account? Login!
                                    </a>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default redirectIfAuthenticated(Register)