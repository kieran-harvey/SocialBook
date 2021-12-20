import React,{useState,useEffect, useContext} from 'react'
import './post.css'
import { MoreVert } from '@material-ui/icons'
import axios from 'axios';
import {format} from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Post = ({post}) => {
    // const user = (Users.filter(u => u.id === post.userId));
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext)

    const [user, setUser] = useState({});

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser?._id))
    }, [currentUser?._id,post.likes])

    useEffect(() => {
        const fetchUser = async () =>{
            const res = await axios.get(`/users/?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser();
    },[post.userId]);
    
    const likeHandler = () =>{
        try{
            axios.put('/posts/' +post._id+ '/like',{userId:currentUser._id})
        }catch(err){
            console.log(err)
        }
        setLike(isLiked ? like-1:like + 1);
        setIsLiked(!isLiked);
    }
    return (
        <div className='post'>
            <div className='postWrapper'>
                <div className='postTop'>
                    <div className='postTopLeft'>
                        <Link to={`profile/${user.username}`}>
                            <img className='profileImg' src={ user.profilePicture ? PF + user.profilePicture : PF+'noavatar.png'} alt='profile'></img>
                        </Link>
                        <span className='postUsername'>{ user.username || ""}</span>
                        <span className='postDate'>{format(post.createdAt)}</span>
                    </div>
                    <div className='postTopRight'>
                        <MoreVert/>
                    </div> 
                </div>
                <div className='postCenter'>
                    <span className="postText">{post.desc}</span>
                    {post.img ? <img src={PF + post.img} className='postImg'></img>:null}
                </div>
                <div className='postBottom'>
                    <div className="postBottomLeft">
                        <img src={ PF + `heart.png`} className='likeIcon' alt='heart' onClick={likeHandler}></img>
                        <img src={ PF + `like.png`} className='likeIcon' alt='like' onClick={likeHandler}></img>
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post