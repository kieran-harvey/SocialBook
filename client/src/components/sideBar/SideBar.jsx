import React,{useContext,useState,useEffect} from 'react'
import './sideBar.css'
import { RssFeed } from '@material-ui/icons'
import CloseFriend from '../closeFriend/CloseFriend'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export const SideBar = () => {

    const {user:currentUser} = useContext(AuthContext)
    const [friends,setFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () =>{
            try{
                const friendList = await axios.get('/users/friends/' + currentUser._id)
                setFriends(friendList.data);
            }catch(err){
                console.log(err);
            }
        }
        getFriends();
    }, [currentUser]);

    return (
        <div className='sideBar'>
            <div className='sideBarWrapper'>
                <ul className='sideBarList'>
                    <li className='sideBarListItem'>
                        <RssFeed className='sideBarIcon'/>
                        <span className='sideBarListItemText'>Feed</span>
                    </li>
                    <li className='sideBarListItem'>
                        <RssFeed className='sideBarIcon'/>
                        <span className='sideBarListItemText'>Chats</span>
                    </li>
                    <li className='sideBarListItem'>
                        <RssFeed className='sideBarIcon'/>
                        <span className='sideBarListItemText'>Videos</span>
                    </li>
                    <li className='sideBarListItem'>
                        <RssFeed className='sideBarIcon'/>
                        <span className='sideBarListItemText'>Groups</span>
                    </li>
                    <li className='sideBarListItem'>
                        <RssFeed className='sideBarIcon'/>
                        <span className='sideBarListItemText'>Bookmarks</span>
                    </li>
                    <li className='sideBarListItem'>
                        <RssFeed className='sideBarIcon'/>
                        <span className='sideBarListItemText'>Questions</span>
                    </li>
                    <li className='sideBarListItem'>
                        <RssFeed className='sideBarIcon'/>
                        <span className='sideBarListItemText'>Jobs</span>
                    </li>
                    <li className='sideBarListItem'>
                        <RssFeed className='sideBarIcon'/>
                        <span className='sideBarListItemText'>Events</span>
                    </li>
                    <li className='sideBarListItem'>
                        <RssFeed className='sideBarIcon'/>
                        <span className='sideBarListItemText'>Courses</span>
                    </li>
                </ul>
                <button className='sideBarButton'>Show More</button>
                <hr className='sideBarHr'/>
                <ul className='sideBarFriendList'>
                    {
                        friends.map(friend =>{return <CloseFriend user={friend}></CloseFriend>})
                    }

                </ul>
            </div>
        </div>
    )
}

export default SideBar