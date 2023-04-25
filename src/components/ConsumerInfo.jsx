import React from "react";
import { useLocation } from "react-router-dom";
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
    </div>
  );
};

export default SubstationInfo;
