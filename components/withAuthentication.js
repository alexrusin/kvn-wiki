/* eslint-disable multiline-ternary */
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

const withAuthentication = (WrappedComponent) => {
  const RequiresAuthentication = (props) => {
    const membership = useSelector(({ user }) => user.membership)
    const router = useRouter()

    useEffect(() => {
      if (membership === 'guest') router.push('/login')
    }, [membership])

    return membership && membership !== 'guest' ? (
      <WrappedComponent {...props} />
    ) : (
      <div>Loading...</div>
    )
  }

  return RequiresAuthentication
}

withAuthentication.propTypes = {
  WrappedComponent: PropTypes.node.isRequired
}

export default withAuthentication
