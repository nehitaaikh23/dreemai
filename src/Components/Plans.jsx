import React from 'react'
import { PricingTable } from '@clerk/react'

const Plans = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>
        <div className='text-center'>
            <h2 className='text-slate-700 text-[36px] font-semibold'>Choose Your Plan</h2>
            <p className='text-gray-700 max-w-lg mx-auto'>Choose from our free or premium plan. We've got you covered.</p>
        </div>

        <div className='mt-14 max-sm:mx-8'>
            <PricingTable />
        </div>
    </div>
  )
}

export default Plans