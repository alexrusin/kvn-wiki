import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import redirectIfAuthenticated from '../components/redirectIfAuthenticated'
import { setLoggedInUser } from '../store/actions'

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!email || !password) {
            return
        }

        axios.post('/api/users/login', {
            email,
            password
        }).then(response => {
            dispatch(setLoggedInUser(response.data.user))
            router.push('/dashboard')
        })
          .catch(error => setError('Username or password are invalid'))
    }

    return (
        <div className="bg-gray-400">
           
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    
                    <div className="flex w-full xl:w-3/4 lg:w-11/12">
                        <div
                            className="hidden w-full h-auto bg-gray-400 bg-cover rounded-l-lg lg:block lg:w-1/2"
                        ></div>
                        <div className="w-full p-5 bg-white rounded-lg lg:w-1/2 lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        onFocus={e => setError('')}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border ${error ? "border-red-500" : ""} rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                                        id="email"
                                        type="text"
                                        placeholder="email"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        onFocus={e => setError('')}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border ${error ? "border-red-500" : ""} rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                    />
                                     { error.name &&  <p className="text-xs italic text-red-500">{ error }</p>}
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Sign In
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <Link href="/register">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    >
                                        Create an Account!
                                    </a>
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link href="#">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    >
                                        Forgot Password?
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

export default redirectIfAuthenticated(Login)