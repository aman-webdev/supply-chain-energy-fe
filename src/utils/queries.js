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