import React from 'react'
import './closeFriend.css'

export const CloseFriend = ({user}) => {
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className='sideBarFriend'>
            <img className='sideBarFriendImg' src={publicFolder + user.profilePicture} alt=''/>
            <span className='sideBarFriendName'>{user.username}</span>
        </li>
    )
}

export default CloseFriend;
