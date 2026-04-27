import React, { useEffect, useState} from 'react'
import { assets, dummyCreationData, dummyPublishedCreationData } from '../assets/assets'
import { useAuth, useUser } from '@clerk/react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Community = () => {

  const [creations, setCreations] = useState([]);
  const {user} = useUser();
  const [loading, setLoading] = useState(true);

  const [likeLoading, setLikeLoading] = useState(false);

  const {getToken} = useAuth();


  const fetchCreations = async() => {
    try {
      const token = await getToken();
      const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/published-creations`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching creations:', error);
      toast.error('Failed to fetch creations. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  const imageLikeToggle = async (id) => {
    try {
      setLikeLoading(true);
      const token = await getToken();
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/toggle-likes`, {id},{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data.success){
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error('Error toggling like:', error);
    } finally {
      setLikeLoading(false);
    }
  }

  useEffect(() => {
    if (user){
      fetchCreations()
    }
  },[user])

  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      Creations
      
      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll'>
        {loading 
        ? (<div className='flex-1 h-full text-lg flex flex-col gap-4 p-6 justify-center items-center text-slate-700'>
                    <span className='w-4 h-4 my-1 rounded-full border-2
                      border-t-transparent animate-spin'></span><span>Loading Creations...</span>
        </div> 
        ) 
        : (
          <div>{creations.map((creation, i) => (
          <div key={i} className='relative group inline-block pl-3 pt-3 w-full
          sm:max-w-1/2 lg:max-w-1/3'>
            <img src={creation.content} alt="" className='w-full h-full object-cover
            rounded-lg'/>

            <div className='absolute bottom-0 top-0 right-0 left-3 flex gap-2
            items-end justify-end group-hover:justify-between p-3 group-hover:bg-linear-to-b from-transparent to-black/80
            text-white rounded-lg'>
              <p className='text-sm hidden group-hover:block'>{creation.prompt}</p>
              {likeLoading 
              ? <span className='w-4 h-4 my-1 rounded-full border-2
                      border-t-transparent animate-spin'></span>
              :<div className='flex gap-1 items-center'>
                <p>{creation.likes.length}</p>
                <Heart onClick={() => imageLikeToggle(creation.id)} className={`min-w-5 h-5 hover:scale-110 cursor-pointer 
                  ${creation.likes.includes(user.id)? 'fill-red-500 text-red-600':''}`}/>
              </div>
                }
              
            </div>
          </div>
        ))}</div>
          
        ) }
        
      </div>
      
    </div>
  )
}

export default Community