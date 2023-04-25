import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAccount, useContract, useSigner } from "wagmi";
import EnergyMarketplaceABI from "../utils/EnergySupplyChain.json"
import notify from "../utils/notify";

const SubstationInfo = ({ entity }) => {
  const {
    id,
    number,
    owner,
    name,
    area,
    totalEnergyBought,
    totalEnergySold,
    energyAvailableToBuy,
    addedAt, isConnectedToPowerplant,powerplant
  } = entity;
  const {address}=useAccount()
  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({
    address: process.env.REACT_APP_CONTRACT_ADDRESS,
    abi: EnergyMarketplaceABI,
    signerOrProvider: signer,
  });
  const [energyAmount,setEnergyAmount]=useState('')
  const location = useLocation()

  const buyEnergy=async()=>{
    try{
      const tx = await contract.buyEnergyFromPowerPlant(energyAmount)
      const txRes = await tx.wait(1)
      notify("Energy Bought successfully")
    }catch(e){
      toast.error(e.reason)
    }
     
  }


  return (
    <div className="text-white p-6 border my-8 w-2/4 rounded-sm border-[#fffc12]  flex justify-between flex-col">
      <div>
      <div className="flex justify-between items-center  border-b-2 pb-3 border-[#ffffffa2]">
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
     {isConnectedToPowerplant && powerplant && <div className="text-xs my-4 flex justify-between">
          <p>Connected To</p>
          <p>{powerplant?.id}</p>
        </div>}
      <div className="text-xs my-4 flex justify-between">
        <p>Added At</p>
        <p>{new Date(addedAt * 1000).toLocaleDateString()}</p>
      </div>
      {entity.owner?.toLowerCase()===address?.toLowerCase() && location.pathname==='/dashboard' && isConnectedToPowerplant && <div className="my-4 border-t border-[#ffffff34] pt-3 flex justify-between items-center">
        <p>Buy Energy</p>
        <div className="flex gap-6">
          <input
            type="text"
            value={energyAmount}
            onChange={(e)=>setEnergyAmount(e.target.value)}
            className="py-1 px-6 focus:border-[#fffc12] text-black focus:border focus:outline-none "
          />
          <button onClick={buyEnergy} className="py-1 px-8 bg-[#fffc12] font-medium text-black font-poppins">
            Buy Energy
          </button>
        </div>
      </div>}
      </div>
      <div className="hero w-full  hover:bg-[#fffc12] bg-[#1e1d1d] text-[#fffc12] cursor-pointer transition-colors hover:text-black text-xs py-4 px-5 flex justify-evenly">
        <div className="text-left">
          <p>Total units Bought</p>
          <p className="mt-2 font-bold text-2xl">{totalEnergyBought}</p>
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
    </div>
  );
};

export default SubstationInfo;
