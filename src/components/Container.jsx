import React from 'react'
import PowerplantInfo from './PowerplantInfo'
import SubstationInfo from './SubstationInfo'
import DistributorInfo from './DistributorInfo'
import ConsumerInfo from './ConsumerInfo'

const Container = ({entities,type='powerplant'}) => {
  return (
    <div className='w-full mt-8 flex gap-10  wrap items-stretch'>
      {entities?.length && type==='powerplant' ? entities.map(entity=><PowerplantInfo entity={entity} key={entity.id}/>) :null}
      {entities?.length && type==='substation' ? entities.map(entity=><SubstationInfo entity={entity} key={entity.id}/>) :null}
      {entities?.length && type==='distributor' ? entities.map(entity=><DistributorInfo entity={entity} key={entity.id}/>) :null}
      {entities?.length && type==='Consumer' ? entities.map(entity=><ConsumerInfo entity={entity} key={entity.id}/>) :null}
    </div>
  )
}

export default Container