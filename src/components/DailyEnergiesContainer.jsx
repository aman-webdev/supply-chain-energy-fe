import React from 'react'
import DailyEnergy from './DailyEnergy'

const DailyEnergiesContainer = ({label,dailyEnergies}) => {
  return (
    <div className=''>
        <h3 className='my-6 text-xl'>{label}</h3>
        <div className='flex flex-wrap'>

        {dailyEnergies.length ? dailyEnergies.map(energy=> <DailyEnergy energy={energy} key={energy.id}/>):null}
        </div>
    </div>
  )
}

export default DailyEnergiesContainer