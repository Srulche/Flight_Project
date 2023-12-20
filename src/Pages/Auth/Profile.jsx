import React from 'react'
import { useUser } from '../../Context/UserContext'
import Authenticated from './Authenticated'
import './auth.css'
import BookedFlightCards from '../../Components/Cards/BookedFlightCards'
import { Modal } from 'antd'

function Profile() {
     // here user is available
    const {user, signOut} = useUser()
    const confirmSignout = () => {
        Modal.confirm({
            title:"Travel - Sign out",
            content:"Are you sure you want to sign out ?",
            okText:"Sign out",
            cancelText:"Cancel",
            onOk: signOut
        })
    }      
   return <div className='profile-page'>
        <h2>Hello {user.fullName}</h2>
        <BookedFlightCards/>
        <button className='btn flex' onClick={confirmSignout}>Sign out</button>
    </div>
}

export default Authenticated(Profile)