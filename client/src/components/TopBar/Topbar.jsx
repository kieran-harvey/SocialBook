import React, { useContext } from 'react'
import './topbar.css'
import {Search,Person,Chat,Notifications} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios';
import {useState} from 'react'

export const Topbar = () => {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const[users,setUsers] = useState([]);

    const filter = async (e) =>{
        const users = await axios.get('/users/filter/?value=' + e.currentTarget.value);
        console.log(users);
    };
    return (
        <div className='topBarContainer'>
            <div className='topBarLeft'>
                <Link to='/' style={{textDecoration:'none'}}>
                    <span className='logo'>SocialBook</span>
                </Link>
                
            </div>
            <div className='topBarCenter'>
                <div className='searchbar'>
                    <Search className='searchIcon'/>
                    <input className='searchInput' placeholder='Search for friends' onChange={filter}></input>
                </div>
            </div>
            <div className='topBarRight'>
                <div className='topBarLinks'>
                    <span className='topBarLink'>Homepage</span>
                    <span className='topBarLink'>Timeline</span>
                </div>
                <div className='topBarIcons'>
                    <div className='topBarIconItem'>
                        <Person/>
                        <span className='topBarIconBadge'>1</span>
                    </div>
                    <div className='topBarIconItem'>
                        <Chat/>
                        <span className='topBarIconBadge'>2</span>
                    </div>
                    <div className='topBarIconItem'>
                        <Notifications/>
                        <span className='topBarIconBadge'>1</span>
                    </div>
                </div>
                <Link to={`/profile/${user?.username}`}> 
                    <img  className='topBarImage' alt='Profile Pic' src={user?.profilePicture ? PF + user.profilePicture : PF+'noAvatar.png'}/>
                </Link>
            </div>
           
        </div>
    )
}

export default Topbar
