const showConnectButton=(entities,hasUserEntity)=>{
    let res ={powerplant:false,substation:false,distributor:false,consumer:false}
    if(!hasUserEntity || !entities.length) return res;
    const {powerplants,substations,distributors,consumers} = entities;
    if(powerplants.length) return res;
    if(substations.length) res = {...res,substation:true}
    if(distributors.length) res = {...res,distributor:true}
    if(consumers.length) res = {...res,consumer:true}
    return res;
    
}