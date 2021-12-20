import React,{useState,useEffect} from 'react';
import TopBar from '../../../components/TopBar/Topbar.jsx';
import SideBar from '../../../components/sideBar/SideBar.jsx';
import RightBar from '../../../components/rightBar/RightBar.jsx';
import Feed from '../../../components/feed/Feed.jsx'
import axios from 'axios';
import {useParams} from 'react-router'
import './profile.css'

export const Profile = () => {

    const [user, setUser] = useState({});
    const username = useParams().username

    useEffect(() => {
        const fetchUser = async () =>{
            const res = await axios.get(`/users/?username=${username}`)
            setUser(res.data)
        }
        fetchUser();
    },[username]);

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <React.Fragment>
            <TopBar/>
            <div className='profile'>
                <SideBar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className='profileCover'>
                            <img src={ user.coverPicture ? publicFolder + user.coverPicture: publicFolder + `cover.jpg`} alt='' className='profileCoverImg'/>
                            <img src={ user.profilePicture ? publicFolder + user.profilePicture : publicFolder + `noavatar.png`} alt='' className='profileUserImg'/>
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <h4 className='profileInfoDesc'>{user.desc}</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <RightBar user={user}/>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default Profile;
