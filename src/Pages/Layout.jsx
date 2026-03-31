import { Menu, X } from 'lucide-react';
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import Sidebar from '../Components/Sidebar';
import { useUser, SignIn } from '@clerk/react';

const Layout = () => {

  const navigate = useNavigate();
  const {user} = useUser();
  const [sidebar, setSidebar] = useState(false)

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>

      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
        <div className="flex items-center gap-2 text-2xl cursor-pointer" onClick={() => {navigate("/")}}>
          <img src={assets.favicon} alt="logo"className='w-8'/>
          <h1 className='text-primary font-bold'>Dreem.AI</h1>
        </div>
        {
            sidebar ? <X className='w-6 h-6 text-gray-700 sm:hidden' onClick={() => setSidebar(false)}/> 
            : <Menu className='w-6 h-6 text-gray-700 sm:hidden' onClick={() => setSidebar(true)}/>
          }
      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
          <div className='flex-1 bg-[#F4F7FB]'>
            <Outlet />
          </div>
      </div>


        
    </div>
    
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
    
  )
}

export default Layout