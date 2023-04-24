import React from "react";
import Arrow from "./Arrow";

const DistributorInfo = ({ entity }) => {
  const {
    id,
    number,
    owner,
    name,
    area,
    totalEnergyBought,
    totalEnergySold,
    energyAvailableToBuy,
    addedAt,
    toShowLessEnergyWarning,
    isElectricitySupply,
  } = entity;
  return (
    <div className="text-white p-6 border my-8 w-2/3 rounded-sm border-[#fffc12] cursor-pointer">
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
      <div
        className={`hero w-full bg-[#fffc12] text-black text-xs py-4 px-5 flex justify-evenly`}
      >
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
      {!toShowLessEnergyWarning && (
        <div className="flex justify-center mt-6 bg-red-400 py-2 px-4">
          <p className="text-center font-poppins font-medium text-xl">
            {" "}
            Less Energy Available
          </p>
        </div>
      )}
      <div
        className={`flex justify-center mt-2 ${
          isElectricitySupply ? "bg-green-400" : "bg-red-500"
        } py-2 px-4`}
      >
        <p className="text-center font-poppins font-medium text-xl">
          {" "}
          {isElectricitySupply ? "Electricity Supply" : "No Electricity Supply"}
        </p>
      </div>
    </div>
  );
};

export default DistributorInfo;
