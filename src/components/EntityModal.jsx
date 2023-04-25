import { useQuery } from "@apollo/client";
import Modal from "react-modal";
import React from "react";
import {
  GET_POWERPLANT_BY_ID,
  GET_DISTRIBUTORS_BY_ID,
  GET_SUBSTATION_BY_ID,
} from "../utils/queries";
import Container from "./Container";
import DailyEnergiesContainer from "./DailyEnergiesContainer";
import { useContract, useSigner } from "wagmi";
import EnergyMarketplaceABI from "../utils/EnergySupplyChain.json"
import notify from "../utils/notify";
import { toast, ToastContainer } from "react-toastify";

Modal.setAppElement("#root");

const modalStyles = {
  content: {
    width: "90%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "95%",
    transform: "translate(-50%, -50%)",
    background: "rgb(30, 29, 29)",
    border: "none",
    color: "white",
    FontFace: "poppins",
  },
};
Modal.defaultStyles.overlay.backgroundColor = "rgba(255,255,255,.2";
Modal.defaultStyles.overlay.overflow = "auto";

const EntityModal = ({
  modalIsOpen,
  id,
  setIsModalOpen,
  type,
  connectionType,
  userEntities,hasUserCreatedEntity
}) => {

  
  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({
    address: process.env.REACT_APP_CONTRACT_ADDRESS,
    abi: EnergyMarketplaceABI,
    signerOrProvider: signer,
  });

  const getQuery = () => {
    switch (type) {
      case "powerplant":
        return GET_POWERPLANT_BY_ID;
      case "substation":
        return GET_SUBSTATION_BY_ID;
      case "distributor":
        return GET_DISTRIBUTORS_BY_ID;
      // case "powerplant":
      //   return GET_POWERPLANT_BY_ID;
      default:
        return GET_POWERPLANT_BY_ID;
    }
  };

  const { error, data, loading } = useQuery(getQuery(), {
    variables: { id: id },
  });
 

  const renderActionButton=()=>{
    if(userEntities && hasUserCreatedEntity){
        if(type==='powerplant' && userEntities.substations.length && userEntities.substations[0]?.powerplant?.id!==id) return 'Connect To Powerplant'
        if(type==='substation' && userEntities.distributors.length && userEntities.distributors[0]?.substation?.id!==id) return 'Connect To Substation'
        if(type==='distributor' && userEntities.consumers.length && userEntities.consumers[0]?.distributor?.id!==id) return 'Connect To Distributor'
    } 
    return ''
    // if(type==='powerplant' )
  }

  const closeModal=()=>{
    setIsModalOpen(false)
  }

  const connectToEntity=async()=>{
    try{
      switch (type) {
        case "powerplant":
          const txPower = await contract.connectSubstationToPowerplant(data.entity.number);
          console.log(txPower);
          notify("Powerplant added successfully")
          closeModal()
          break;
        case "substation":
          const txSub = await contract.connectDistributorToSubstation(data.entity.number);
          console.log(txSub);
          notify("Substation added successfully")
          closeModal()
          break;
        case "distributor":
          const txDis = await contract.connectConsumerToDistributor(data.entity.number);
          console.log(txDis);
          notify("Distributor added successfully")
          closeModal()
          break;
        default:
          console.log("default case");
          break;
      }
    }catch(e){
      console.log(e)
      toast.error(e.reason)
    }
  }


 
  const getConnection=()=>{
    switch (type) {
      case 'powerplant':
        return 'Substations'
      case 'substation':
        return 'Distributors'
      case 'distributor':
        return 'Consumers'
      default:
        return ''
        
    }
  }
console.log(loading,error,data,"here")
  return loading
    ? "Loading"
    : data?.entity && modalIsOpen && (
        <Modal
          style={modalStyles}
          onRequestClose={() => setIsModalOpen(false)}
          isOpen={modalIsOpen}
        >
          <div className="text-xl text-white font-medium font-poppins justify-between  text-left mt-5 flex gap-4 items-center ">
            <div>{data.entity.name}</div>
            <div>{data.entity.owner}</div>
          </div>
          <div className="flex justify-between items-center my-3">
          <p className="text-sm mt-2 ">{id}</p>
          {renderActionButton() && <button onClick={connectToEntity} className="py-2 px-6 rounded-sm  text-xs text-white hover:text-[black] transition-colors hover:bg-[#fffc12] font-poppins border-[#fffc12] border ">{renderActionButton()}</button>}
          </div>
          <div className="h-0.5 w-5/6 my-6 opacity-25 mx-auto bg-slate-50"></div>
          <div className="hero w-full  bg-[#1e1d1d] text-[#fffc12] cursor-pointer transition-colors text-xs py-4 px-5 flex justify-evenly">
            <div className="text-left">
              <p>
                {type === "powerplant"
                  ? "Total units Produced"
                  : "Total units Bought"}
              </p>
              <p className="mt-2 font-bold text-2xl">
                {data.entity.totalEnergyFrom}
              </p>
            </div>
            <div className="text-left">
              <p>Total units Sold</p>
              <p className="mt-2 font-bold text-2xl">
                {data.entity.totalEnergyTo}
              </p>
            </div>
            <div className="text-left">
              <p>Units Available to Buy</p>
              <p className="mt-2 font-bold text-2xl">
                {data.entity.energyAvailableToBuy}
              </p>
            </div>
          </div>
          {data.entity.connections && data.entity.connections.length ? (
            <Container
              title={`Connected ${getConnection()} :`}
              entities={data.entity?.connections}
              type={type}
              connectionType={connectionType}
            />
          ) : null}
          {data.entity.energiesFromDate &&
          data.entity.energiesFromDate.length ? (
            <DailyEnergiesContainer
              label={
                type === "powerplant" ? "Energies Produced" : "Energies Bought"
              }
              dailyEnergies={data.entity.energiesFromDate}
            />
          ) : null}
          {data.entity.energiesToDate &&
          data.entity.energiesToDate.length ? (
            <DailyEnergiesContainer
              label={
            "Energies Sold"
              }
              dailyEnergies={data.entity.energiesToDate}
            />
          ) : null}
      <ToastContainer theme="dark" position="top-right"/>
       
        </Modal>
      );
};

export default EntityModal;
