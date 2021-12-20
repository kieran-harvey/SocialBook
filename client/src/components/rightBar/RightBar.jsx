import React,{useEffect,useState,useContext} from 'react'
import './rightBar.css'
import {Users} from '../../dummyData';
import Online from '../online/Online'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@material-ui/icons';

export const RightBar = ({user}) => {
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const [friends,setFriends] = useState([]);

    const {user:currentUser,dispatch} = useContext(AuthContext)

    const [followed,setFollowed] = useState(currentUser?.following.includes(user?.id));

    useEffect(()=>{
        setFollowed(currentUser?.following.includes(user?.id))
    },[currentUser,user?.id])

    useEffect(() => {
        const getFriends = async () =>{
            try{
                const friendList = await axios.get('/users/friends/' + user?.id)
                setFriends(friendList.data);
            }catch(err){
                console.log(err);
            }
        }
        getFriends();
    }, [user]);

    const handleClick = async () =>{
        try{
            if(followed){
                await axios.put('/users/' + user._id+"/unfollow",{
                    userId: currentUser._id,
                });
                dispatch({type:'UNFOLLOW', payload:user._id})
            }else{
                await axios.put('/users/' + user._id+"/follow",{
                    userId:currentUser._id,
                });
                dispatch({type:'FOLLOW', payload:user._id})
            }
            
        }catch(err){
            console.log(err);
        }
        setFollowed(!followed)
    }
    
    const HomeRightBar = () =>{
        return(
            <>
                <div className="birthdayContainer">
                    <img className='birthdayImg' src='/assests/gift.png' alt='birthday'/>
                    <span className='birthdayText'>
                        <b>Jane</b> and <b>2 other friends</b> have a birthday today
                    </span>
                </div>
                <img src='\assests\ad.png' className='rightBarAd' alt='ad'/>
                <h4 className="rightBarTitle">Online Friends</h4>
                <ul className="rightBarFriendList">
                    {
                        Users.map((user)=>{
                            return <Online user={user}/>
                        })
                    }
                </ul>
            </>
        )
    }

    const ProfileRightBar = ({userId}) =>{
        return(
            <>
            {user?.username !== currentUser?.username && (
                <button className='rightBarFollowButton' onClick={handleClick}>
                    {followed ? 'Remove Friend' : 'Add Friend'}
                    {followed ? <Remove/> : <Add/>}
                </button>
            )}
                <h4 className='rightBarTitle'>User Information</h4>
                <div className="rightBarInfo">
                    <div className="rightBarInfoItem">
                        <span className='rightBarInfoKey'>City:</span>
                        <span className='rightBarInfoValue'>{user.city}</span>
                    </div>
                    <div className="rightBarInfoItem">
                        <span className='rightBarInfoKey'>From:</span>
                        <span className='rightBarInfoValue'>{user.from}</span>
                    </div>
                    <div className="rightBarInfoItem">
                        <span className='rightBarInfoKey'>Relationship:</span>
                        <span className='rightBarInfoValue'>{user.relationship === 1 ? 'Single' : user.relationship===2 ? 'Married':'Dead'}</span>
                    </div>
                </div>
                <h4 className='rightBarTitle'>User Friends</h4>
                <div className="rightBarFollowings">
                    {friends.map(friend =>(
                        <Link to={'/profile/' + friend.username} style={{textDecoration:'none'}}>
                        <div className="rightBarFollowing">
                            <img src={friend.profilePicture ? publicFolder + friend.profilePicture : publicFolder + 'noavatar.png'} className='rightBarFollowingImg'/>
                            <span className='rightBarFollowingName'>{friend.username}</span>
                        </div>
                        </Link>
                    ))}

                </div>
            </>
        )
    }
    return (
        <div className='rightBar'>
            <div className="rightBarWrapper">
                {user ? <ProfileRightBar/> : <HomeRightBar/>}
            </div>
        </div>
    )
}

export default RightBar;
