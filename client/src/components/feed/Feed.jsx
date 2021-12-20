import Share from '../share/Share'
import React,{useState,useEffect, useContext} from 'react'
import './feed.css'
import Post from '../post/Post.jsx'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export const Feed = ({username}) => {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(() => {
        const fetchPosts = async () =>{
            const res = username 
            ? await axios.get('/posts/profile/' + username)
            : await axios.get('/posts/timeline/' + user._id)
            setPosts(res.data.sort((p1,p2) =>{
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }))
        }
        fetchPosts();
    },[username,user?._id]);
    return (
        <div className='feed'>
            <div className='feedWrapper'>
                {( !username || username === user?.username) && <Share/>}
                {posts?.map((p) => {
                   return <Post key={p._id} post={p}/>
                })}
            </div>
        </div>
    )
}

export default Feed
