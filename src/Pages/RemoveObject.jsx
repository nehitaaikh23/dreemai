import React, {useState} from 'react';
import { Scissors, Sparkles } from 'lucide-react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/react';

const RemoveObject = () => {

    
    const [input, setInput] = useState('');
    const [object, setObject] = useState('');

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');

    const {getToken} = useAuth();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const token = await getToken();

          if (object.split(" ").length > 1){
            toast("Please enter a single object name without spaces.")
          }
          
          const formData = new FormData();
          formData.append('image', input);
          formData.append('object', object);

          const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/ai/remove-object`, formData, 
          
        {headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`}})

          if (data.success){
          setContent(data.message);
        } else {
          toast.error(data.error);
        }
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
    }


  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4
        text-slate-700'>
          <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border
          border-gray-200'>
            <div className='flex items-center gap-3'>
              <Sparkles className='w-6 text-[#4A7AFF]'/>
              <h1 className='text-xl font-semibold'>Object Removal</h1>
            </div>
            <p className='mt-6 text-sm font-medium'>Upload Image</p>
            <input onChange={(e) => {setInput(e.target.files[0])}} type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm
            rounded-md border border-gray-300 text-gray-600'  required/>
    
            <p className='text-xs text-gray-500 font-light mt-1'>Supports JPG, JPEG, PNG, and other image formats.</p>

            <p className='mt-6 text-sm font-medium'>Describe object to remove</p>
            <textarea  rows={4} onChange={(e) => {setObject(e.target.value)}} value={object} className='w-full p-2 px-3 mt-2 outline-none text-sm resize-none
            rounded-md border border-gray-300' placeholder='Single object name, e.g watch or spoon' required/>
           
            <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r
            from-[#417df6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>

              {
                      loading ? <span className='w-4 h-4 my-1 rounded-full border-2
                      border-t-transparent animate-spin'></span> : <Scissors className='w-5'/>
          }

              
              Remove Object
            </button>
          </form>
    
          <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
              <div className='flex items-center gap-3'>
                <Scissors className='w-5 h-5 text-[#4A7AFF]'/>
                <h1 className='text-xl font-semibold'>Processed Image</h1>
              </div>

              {!content 
              ? 
              (<div className='flex-1 flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                  <Scissors className='w-9 h-9'/>
                  <p>Upload an image, enter description and click "Remove Object" to get started.</p>
                </div>
              </div>)
              : (<div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
                        <div className='reset-tw'>
                          
                            <img src={content} className='mt-3 h-full w-full' />
                          
                          </div>
                      </div>)}
              
          </div>
        </div>
  )
}

export default RemoveObject