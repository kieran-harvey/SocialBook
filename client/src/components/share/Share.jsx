import React, { useContext,useRef,useState } from 'react'
import './share.css'
import {PermMedia,Label,Room, Cancel } from '@material-ui/icons'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export const Share = () => {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file,setFile] = useState(null);

    const submitHandler = async (e) =>{
        e.preventDefault();
        const newPost = {
            userId:user._id,
            desc:desc.current.value,
            img:''
        }

        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('imgPostFile',file,file.name);
            data.append('name',fileName)
            newPost.img = fileName;
            try{
                await axios.post('/upload',data)
            }catch(err){
                console.log(err);
            }
        }
        try{
            await axios.post('/posts',newPost);
            window.location.reload();
        }catch(err){
            console.log(err);
        }

    }

    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className='shareTop'>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + 'noAvatar.png'}  className='shareProfileImg' alt=''></img>
                    <input className='shareInput' placeholder={"What's on your mind " + user.username + "?"} ref={desc}></input>
                </div>
                <hr className='shareHr'/>
                {file && (
                        <div className='shareImgContainer'>
                            <img className='shareImg' src={URL.createObjectURL(file)} alt='picture'/>
                            <Cancel className='shareCancelImg' onClick={()=>setFile()}/>
                        </div>
                    )}
                <form className='shareBottom' enctype="multipart/form-data" onSubmit={submitHandler}>
                    <div className='shareOptions'>
                        <label htmlFor='file' className='shareOption'>
                            <PermMedia htmlColor='tomato' className='shareIcon'/>
                            <span className='shareOptionText'>Photo or Video</span>
                            <input style={{display:"none"}} type='file' id='file' accept='.png,.jpeg,.jpg' onChange={e => setFile(e.target.files[0])}></input>
                        </label>
                        <div className='shareOption'>
                            <Label htmlColor='blue' className='shareIcon'/>
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className='shareOption'>
                            <Room htmlColor='green' className='shareIcon'/>
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className='shareOption'>
                            <Room htmlColor='goldenrod' className='shareIcon'/>
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <button className='shareButton' type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share
