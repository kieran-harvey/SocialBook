import React from 'react'
import TopBar from '../../components/TopBar/Topbar.jsx'
import SideBar from '../../components/sideBar/SideBar.jsx'
import Feed from '../../components/feed/Feed.jsx'
import RightBar from '../../components/rightBar/RightBar.jsx'
import './home.css'

export const Home = () => {
    return (
        <>
            <TopBar/>
            <div className='homeContainer'>
                <SideBar/>
                <Feed/>
                <RightBar/>
            </div>
            
        </>
    )
}

export default Home
