import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAccount, useContract, useSigner } from "wagmi";
import EnergyMarketplaceABI from "../utils/EnergySupplyChain.json"
import notify from "../utils/notify";
import Arrow from "./Arrow";

const SubstationInfo = ({ entity,userEntities,hasUserCreatedEntity }) => {
  const {
    id,
    number,
    owner,
    name,
    // area,
    totalEnergyBought,
    addedAt,
    energyConsumedIncurrentCycle,isElectricitySupply,isConnectedToDistributor,distributor
  } = entity;
  const location = useLocation()
  const {address} = useAccount()
  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({
    address: process.env.REACT_APP_CONTRACT_ADDRESS,
    abi: EnergyMarketplaceABI,
    signerOrProvider: signer,
  });

  const payBill=async()=>{
    try{
      const tx = await contract.payBill();
      const txRes = await tx.wait(1) 
      notify("Bill Paid successfully")  
    }catch(e){
      console.log(e)
      toast.error(e.reason)
    }
   

  }
  const payBillAndCancelSupply=async()=>{
    try{
      const tx = await contract.payBillAndCancelSupply();
      const txRes = await tx.wait(1) 
      notify("Cancelled successfully")  
    }catch(e){
      console.log(e)
      toast.error(e.reason)
    }
  }


  return (
    <div className={`text-white p-6 border my-8  rounded-sm border-[#fffc12]  flex justify-between flex-col ${location.pathname==='/dashboard' ? 'w-2/4':''}`}>
      <div>
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
      {isConnectedToDistributor && distributor && <div className="text-xs my-4 flex justify-between">
          <p>Connected To</p>
          <div className="flex items-center gap-4">
          <p>{distributor?.id}</p>
          <p>|</p>
          <p>{distributor?.energyAvailableToBuy} Units Avail.</p>
          </div>
          
        </div>}
      <div className="text-xs my-4 flex justify-between">
        <p>Added At</p>
        <p>{new Date(addedAt * 1000).toLocaleDateString()}</p>
      </div>
      </div>
      <div>
      {entity.owner?.toLowerCase()===address?.toLowerCase() && location.pathname==='/dashboard' && isConnectedToDistributor  && <div className="my-4 border-t border-[#ffffff34] pt-3 flex justify-between items-center">
        <p></p>
        <div className="flex gap-6">
          <button onClick={payBill} className="py-1 px-8 bg-[#fffc12] font-medium text-black font-poppins">
            Pay Bill
          </button>
          <button onClick={payBillAndCancelSupply} className="py-1 px-8 bg-[#fffc12] font-medium text-black font-poppins">
            Cancel Supply
          </button>
        </div>
      </div>}
      <div className="hero w-full  hover:bg-[#fffc12] bg-[#1e1d1d] text-[#fffc12] cursor-pointer transition-colors hover:text-black text-xs py-4 px-5 flex justify-evenly">
        <div className="text-left">
          <p>Total units Bought</p>
          <p className="mt-2 font-bold text-2xl">{totalEnergyBought}</p>
        </div>
        <div className="text-left">
          <p>Units consumed in current cycle</p>
          <p className="mt-2 font-bold text-2xl">{energyConsumedIncurrentCycle}</p>
        </div>
       
      </div>
      <div
        className={`flex justify-center mt-6 ${
          isElectricitySupply   && distributor?.isElectricitySupply? "bg-green-400" : "bg-red-500"
        } py-2 px-4`}
      >
        <p className="text-center font-poppins font-medium text-xl">
          {" "}
          {isElectricitySupply && distributor?.isElectricitySupply ? "Electricity Supply" : "No Electricity Supply"}
        </p>
      </div>
      </div>
      <ToastContainer position="top-right" theme="dark"/>
    </div>
  );
};

export default SubstationInfo;
