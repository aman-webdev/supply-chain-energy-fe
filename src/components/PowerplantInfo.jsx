import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAccount, useContract, useSigner } from "wagmi";
import EnergyMarketplaceABI from "../utils/EnergySupplyChain.json"
import notify from "../utils/notify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";
import EntityModal from "./EntityModal"


const PowerplantInfo = ({ entity,userEntities,hasUserCreatedEntity }) => {

  const {
    id,
    number,
    owner,
    name,
    area,
    totalEnergyProduced,
    totalEnergySold,
    energyAvailableToBuy,
    addedAt,
  } = entity;

  const {address}=useAccount()
  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({
    address: process.env.REACT_APP_CONTRACT_ADDRESS,
    abi: EnergyMarketplaceABI,
    signerOrProvider: signer,
  });
  const [energyAmount,setEnergyAmount]=useState('')
  const [isModalOpen,setIsModalOpen]=useState(false)
  const location = useLocation()

  const addEnergyAvailableToBuy=async()=>{
    try{
      const tx = await contract.addEnergyAvailableToBuy(energyAmount)
      const txRes = await tx.wait(1)
      notify("Energy Added successfully")
    }catch(e){
      toast.error(e.reason)
    }
     
  }

  return (
    <div className={`text-white p-6 border my-8  rounded-sm border-[#fffc12]  flex justify-between flex-col ${location.pathname==='/dashboard' ? 'w-2/4':''}`}>
    
      <div className="">
        <div className="flex justify-between items-center border-b-2 pb-3 border-[#ffffffa2]">
          <h1 className="text-xl">{name}</h1>
          <p>{owner}</p>
        </div>
        <div className="text-xs my-4 flex justify-between">
          <p>Number </p>
          <p>{number}</p>
        </div>
        <div className="text-xs my-4 flex justify-between">
          <p>ID </p>
          <p>{id}</p>
        </div>
        <div className="text-xs my-4 flex justify-between">
          <p>Area </p>
          <p>{area}</p>
        </div>
        <div className="text-xs my-4 flex justify-between">
          <p>Added At</p>
          <p>{new Date(addedAt * 1000).toLocaleDateString()}</p>
        </div>
      </div>
      {entity.owner?.toLowerCase()===address?.toLowerCase() && location.pathname==='/dashboard' && <div className="my-4 border-t border-[#ffffff34] pt-3 flex justify-between items-center">
        <p>Add Energy</p>
        <div className="flex gap-6">
          <input
            type="text"
            value={energyAmount}
            onChange={(e)=>setEnergyAmount(e.target.value)}
            className="py-1 px-6 focus:border-[#fffc12] text-black focus:border focus:outline-none "
          />
          <button onClick={addEnergyAvailableToBuy} className="py-1 px-8 bg-[#fffc12] font-medium text-black font-poppins">
            Submit
          </button>
        </div>
      </div>}
      <div onClick={()=>setIsModalOpen(!isModalOpen)} className="hero w-full  hover:bg-[#fffc12] bg-[#1e1d1d] text-[#fffc12] cursor-pointer transition-colors hover:text-black text-xs py-4 px-5 flex justify-evenly">
        <div className="text-left">
          <p>Total units Produced</p>
          <p className="mt-2 font-bold text-2xl">{totalEnergyProduced}</p>
        </div>
        <div className="text-left">
          <p>Total units Sold</p>
          <p className="mt-2 font-bold text-2xl">{totalEnergySold}</p>
        </div>
        <div className="text-left">
          <p>Units Available to Buy</p>
          <p className="mt-2 font-bold text-2xl">{energyAvailableToBuy}</p>
        </div>
      </div>
      <ToastContainer position="top-right" theme="dark"/>
      <EntityModal userEntities={userEntities} hasUserCreatedEntity={hasUserCreatedEntity}  id={id} modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} type='powerplant' connectionType='substation' />
    </div>
  );
};

export default PowerplantInfo;
