import React from 'react'

const DailyEnergy = ({energy}) => {
    console.log(energy,"energy")
  return (
    <div className=' w-1/3 border-[#fffc12] text-white p-3  rounded-sm border'>
        <div className='flex justify-between items-center'>
            <p>Amount</p>
            <p>{energy.amount} Units</p>
        </div>
        <div className='flex justify-between items-center'>
            <p>Date</p>
            <p>{energy.date}</p>
        </div>
    </div>
  )
}

export default DailyEnergy