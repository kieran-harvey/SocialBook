import React from 'react'
import './online.css'
export const Online = ({user}) => {
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightBarFriend">
            <div className="rightBarProfileImgContainer">
                <img className='rightBarProfileImg' src ={publicFolder + user.profilePicture} alt=''/>
                <span className='rightBarOnline'></span>
            </div>
            <span className='rightBarUsername'>{user.username}</span>
        </li>   
    )
}

export default Online;
