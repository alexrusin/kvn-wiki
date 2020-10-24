import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import withAuthentication from '../components/withAuthentication'

const Dashboard = () => {
    const router = useRouter()
    const user = useSelector((state) => state.user)

    return (
        <div>Welcome {user.name}</div>
    )

}

export default withAuthentication(Dashboard);