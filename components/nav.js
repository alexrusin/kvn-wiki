/* eslint-disable node/handle-callback-err */
import { useState } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'
import { setLoggedInUser } from '../store/actions'

export default function Nav () {
  const membership = useSelector(({ user }) => user.membership)
  const dispatch = useDispatch()
  const router = useRouter()

  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    axios.post('/api/users/logout').then(response => {
      dispatch(setLoggedInUser({ membership: 'guest' }))
      router.push('/login')
    }).catch(error => console.log('There was an error logging out user'))
  }

  return (
    <nav className="flex justify-center bg-gray-900">
      <div className="container flex flex-wrap items-center p-3">
        <a href="/" className="inline-flex items-center p-2 mr-4">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 mr-2 text-white fill-current"
          >
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
          </svg>
          <span className="text-xl font-bold tracking-wide text-white uppercase">
            Pet
          </span>
        </a>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex p-3 ml-auto text-white rounded outline-none hover:bg-gray-900 lg:hidden hover:text-white nav-toggler"
          data-target="#navigation"
        >
          <i className="material-icons">menu</i>
        </button>
        <div
          className={`${menuOpen ? '' : 'hidden'} w-full top-navbar lg:inline-flex lg:flex-grow lg:w-auto`}
          id="navigation"
        >
          <div className="flex flex-col items-start w-full lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto lg:items-center lg:h-auto">
          <Link href="/">
            <a
              className="items-center justify-center w-full px-3 py-2 text-gray-400 rounded lg:inline-flex lg:w-auto hover:bg-gray-900 hover:text-white"
            >
              <span>Home</span>
            </a>
          </Link>
          <Link href="/pets">
            <a
              className="items-center justify-center w-full px-3 py-2 text-gray-400 rounded lg:inline-flex lg:w-auto hover:bg-gray-900 hover:text-white"
            >
              <span>Pets</span>
            </a>
          </Link>
          <Link href="/new">
            <a
              className="items-center justify-center w-full px-3 py-2 text-gray-400 rounded lg:inline-flex lg:w-auto hover:bg-gray-900 hover:text-white"
            >
              <span>Add Pet</span>
            </a>
          </Link>
          <Link href="/dashboard">
            <a
              className="items-center justify-center w-full px-3 py-2 text-gray-400 rounded lg:inline-flex lg:w-auto hover:bg-gray-900 hover:text-white"
            >
              <span>Dashboard</span>
            </a>
          </Link>
          {
          membership === 'guest'
            ? <Link href="/login">
            <a
              className="items-center justify-center w-full px-3 py-2 text-gray-400 rounded lg:inline-flex lg:w-auto hover:bg-gray-900 hover:text-white"
            >
              <span>Login</span>
            </a>
          </Link>
            : <button type="button"
            onClick={handleLogout}
            className="items-center justify-center w-full px-3 py-2 text-gray-400 rounded lg:inline-flex lg:w-auto hover:bg-gray-900 hover:text-white">
            Log out
          </button>
          }
          </div>
        </div>
      </div>
    </nav>
  )
}
