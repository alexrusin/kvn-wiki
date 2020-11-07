import '../css/index.css'
import '../css/style.css'
import '../css/form.css'
import { DefaultSeo } from 'next-seo'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { wrapper } from '../store/store'
import { setAuthenticatedUser } from '../store/actions'
import Nav from '../components/nav'

function MyApp ({ Component, pageProps }) {
  const membership = useSelector(({ user }) => user.membership)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!membership) dispatch(setAuthenticatedUser())
  }, [])

  return (
     <>
      <DefaultSeo
        title="KVN IMDB"
      />

      <Nav/>
      <Component {...pageProps} />
   </>
  )
}

export default wrapper.withRedux(MyApp)
