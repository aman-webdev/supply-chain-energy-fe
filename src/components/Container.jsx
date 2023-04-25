import React from 'react'
import PowerplantInfo from './PowerplantInfo'
import SubstationInfo from './SubstationInfo'
import DistributorInfo from './DistributorInfo'
import ConsumerInfo from './ConsumerInfo'

const Container = ({entities,type='powerplant',connectionType='',title='',userEntities,hasUserCreatedEntity}) => {
  return (
    <>
      <h3 className='mt-6 text-xl'>{title}</h3>
    <div className='w-full  flex gap-5  flex-wrap items-stretch'>
      {entities?.length && type==='powerplant' && connectionType==='' ? entities.map(entity=><PowerplantInfo userEntities={userEntities} hasUserCreatedEntity={hasUserCreatedEntity} entity={entity} key={entity.id}/>) :null}
      {entities?.length && type==='powerplant' && connectionType==='substation' ? entities.map(entity=><SubstationInfo userEntities={userEntities} hasUserCreatedEntity={hasUserCreatedEntity}  entity={entity} key={entity.id}/>) :null}
      {entities?.length && type==='substation' && connectionType==='' ? entities.map(entity=><SubstationInfo userEntities={userEntities} hasUserCreatedEntity={hasUserCreatedEntity}  entity={entity} key={entity.id}/>) :null}
      {entities?.length && type==='substation' && connectionType==='distributor' ? entities.map(entity=><DistributorInfo userEntities={userEntities} hasUserCreatedEntity={hasUserCreatedEntity}  entity={entity} key={entity.id}/>) :null}
      {entities?.length && type==='distributor'&& connectionType==='' ? entities.map(entity=><DistributorInfo userEntities={userEntities} hasUserCreatedEntity={hasUserCreatedEntity}  entity={entity} key={entity.id}/>) :null}
      {entities?.length && type==='distributor' && connectionType==='consumer' ? entities.map(entity=><ConsumerInfo userEntities={userEntities} hasUserCreatedEntity={hasUserCreatedEntity}  entity={entity} key={entity.id}/>) :null}
      {entities?.length && type==='Consumer' ? entities.map(entity=><ConsumerInfo entity={entity} key={entity.id}/>) :null}
    </div>
    </>
  )
}

export default Container