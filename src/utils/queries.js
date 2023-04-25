import { gql } from "@apollo/client"

export const GET_ALL_ENTITIES_BY_ADDRESS = gql`
query ($owner:Bytes!){
    powerplants( where:{owner:$owner}){
        id
        number
        owner
        name
        area
        totalEnergyProduced
        totalEnergySold
        energyAvailableToBuy
        addedAt
    }
    substations( where:{owner:$owner}){
        id
        number
        owner
        name
        area
        totalEnergyBought
        totalEnergySold
        energyAvailableToBuy
        addedAt
        isConnectedToPowerplant
        powerplant{
            id
            energyAvailableToBuy
        }
       
    }
    distributors( where:{owner:$owner}){
        id
        number
        owner
        name
        area
        totalEnergyBought
        totalEnergySold
        energyAvailableToBuy
        addedAt
        toShowLessEnergyWarning
        isElectricitySupply
        isConnectedToSubstation
        substation{
            id
            energyAvailableToBuy
        }
    }
    consumers( where:{owner:$owner}){
        id
        number
        owner
        name
        # area
        totalEnergyBought
        startCycleTime
        endCycleTime
        energyConsumedIncurrentCycle
        addedAt
        isElectricitySupply
        isConnectedToDistributor
        distributor{
            id
            energyAvailableToBuy
            isElectricitySupply
            toShowLessEnergyWarning 
        }
    }
    
}
`

export const GET_POWERPLANTS=gql`
query{
    powerplants{
        id
        number
        owner
        name
        area
        totalEnergyProduced
        totalEnergySold
        energyAvailableToBuy
        addedAt
    }
}
`

export const GET_SUBSTATIONS=gql`
query{
    substations{
        id
        number
        owner
        name
        area
        totalEnergyBought
        totalEnergySold
        energyAvailableToBuy
        addedAt
        isConnectedToPowerplant
        powerplant{
            id
            energyAvailableToBuy
        }
       
    }
}
`
export const GET_DISTRIBUTORS=gql`
query{
    distributors{
        id
        number
        owner
        name
        area
        totalEnergyBought
        totalEnergySold
        energyAvailableToBuy
        addedAt
        toShowLessEnergyWarning
        isElectricitySupply
        isConnectedToSubstation
        substation{
            id
            energyAvailableToBuy
        }
    }
}
`

export const GET_POWERPLANT_BY_ID = gql`
query ($id:String!){
    entity:powerplant( id:$id){
        id
        number
        owner
        name
        area
        totalEnergyFrom:totalEnergyProduced
        totalEnergyTo:totalEnergySold
        energiesFromDate:energiesProducedByDate{
            id
            amount
            date
            address
            userId
            actionType
            type
        }
        energiesToDate:energiesSoldByDate{
            id
            amount
            date
            address
            userId
            actionType
            type
        }
        energyAvailableToBuy
        addedAt
        connections:substations{
            id
        number
        owner
        name
        area
        totalEnergyBought
        totalEnergySold
        energyAvailableToBuy
        addedAt
        }
    }
}
`
export const GET_SUBSTATION_BY_ID = gql`
query ($id:String!){
    entity:substation( id:$id){
        id
        number
        owner
        name
        area
        totalEnergyFrom:totalEnergyBought
        totalEnergyTo:totalEnergySold
        energiesFromDate:energiesBoughtByDate{
            id
            amount
            date
            address
            userId
            actionType
            type
        }
        energiesToDate:energiesSoldByDate{
            id
            amount
            date
            address
            userId
            actionType
            type
        }
        energyAvailableToBuy
        addedAt
        connections:distributors{
            id
        number
        owner
        name
        area
        totalEnergyBought
        totalEnergySold
        energyAvailableToBuy
        addedAt
        toShowLessEnergyWarning
        isElectricitySupply
        }
    }
}
`
export const GET_DISTRIBUTORS_BY_ID = gql`
query ($id:String!){
    entity:distributor( id:$id){
        id
        number
        owner
        name
        area
        totalEnergyFrom:totalEnergyBought
        totalEnergyTo:totalEnergySold
        energiesFromDate:energiesBoughtByDate{
            id
            amount
            date
            address
            userId
            actionType
            type
        }
        energiesToDate:energiesSoldByDate{
            id
            amount
            date
            address
            userId
            actionType
            type
        }
        energyAvailableToBuy
        addedAt
        connections:consumers{
            id
        number
        owner
        name
        # area
        totalEnergyBought
        startCycleTime
        endCycleTime
        energyConsumedIncurrentCycle
        addedAt
        isElectricitySupply
        isConnectedToDistributor
        distributor{
            id
            energyAvailableToBuy
            isElectricitySupply
            toShowLessEnergyWarning 

        }
        }
    }
}
`