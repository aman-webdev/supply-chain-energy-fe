import React, { useState } from "react";
import { useContract, useSigner } from "wagmi";
import EntityCard from "./EntityCard";
import Modal from "react-modal";
import { ReactComponent as ConsumerIcon } from "../assets/Consumer.svg";
import { ReactComponent as PowerplantIcon } from "../assets/Powerplant.svg";
import { ReactComponent as SubstationIcon } from "../assets/Substation.svg";
import { ReactComponent as DistributorIcon } from "../assets/Distributor.svg";
import { ReactComponent as FormIllustration } from "../assets/FormIllustration.svg";
import EnergyMarketplaceABI from "../utils/EnergySupplyChain.json";
import { toast, ToastContainer } from 'react-toastify';
import notify from "../utils/notify"
import 'react-toastify/dist/ReactToastify.css';


const entities = [
  {
    label: "Powerplant",
    value: "powerplant",
    subtitle:
      "Sign up as powerplant to start selling electricity to substations.",
    svg: <PowerplantIcon className="h-56 w-40 mx-auto opacity-70" />,
  },
  {
    label: "Substation",
    value: "substation",
    subtitle:
      "Sign up as Substation to start selling electricity to distributors.",
    svg: <SubstationIcon className="h-56 w-40 mx-auto opacity-70" />,
  },
  {
    label: "Distributor",
    value: "distributor",
    subtitle:
      "Sign up as Distributor to start selling electricity to consumers.",
    svg: <DistributorIcon className="h-56 w-40 mx-auto opacity-70" />,
  },
  {
    label: "Consumer",
    value: "consumer",
    subtitle: "Sign up as Consumer to start consuming electricity.",
    svg: <ConsumerIcon className="h-56 w-40 mx-auto opacity-70" />,
  },
];

const modalStyles = {
  content: {
    width: "70%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "rgb(30, 29, 29)",
    border: "none",
    color: "white",
    paddingTop: "10rem",
  },
};

Modal.setAppElement("#root");
Modal.defaultStyles.overlay.backgroundColor = "rgba(255,255,255,.2";
Modal.defaultStyles.overlay.overflow = "auto";

const Welcome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState({});
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [energyAvailable, setEnergyAvailable] = useState("");
  const [address, setAddress] = useState("");
  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({
    address: process.env.REACT_APP_CONTRACT_ADDRESS,
    abi: EnergyMarketplaceABI,
    signerOrProvider: signer,
  });

  console.log(contract, "contract", signer);
  const onSignupClick = (value) => {
    setSelectedEntity(value);
    setIsModalOpen(!isModalOpen);
  };

  const onSignupFormSubmit = async (event) => {
    event.preventDefault();
    let formData = {};
    if (selectedEntity.value !== "consumer") {
      if (name === "" || area === "" || energyAvailable === "") {
        alert("Please enter all values");
        return;
      }
      formData = { name, area, energyAvailableToBuy: energyAvailable };
    } else {
      if (name === "" || address === "") {
        alert("Please enter all values");
        return;
      }
      formData = { name, homeAddress: address };
    }

    try{
        switch (selectedEntity.value) {
          case "powerplant":
            const txPower = await contract.addPowerPlant(formData.name,formData.area,formData.energyAvailableToBuy);
            console.log(txPower);
            notify("Powerplant added successfully")
            closeModal()
            break;
          case "substation":
            const txSub = await contract.addSubstation(formData.name,formData.area,formData.energyAvailableToBuy);
            console.log(txSub);
            notify("Substation added successfully")
            closeModal()
            break;
          case "distributor":
            const txDis = await contract.addDistributor(formData.name,formData.area,formData.energyAvailableToBuy);
            console.log(txDis);
            notify("Distributor added successfully")
            closeModal()
            break;
          case "consumer":
            const txCon = await contract.addConsumer(formData.name,formData.homeAddress);
            console.log(txCon);
            notify("Consumer added successfully")
            closeModal()
            break;
          default:
            console.log("default case");
            break;
        }
      }catch(e){
        toast.error(e.reason)
      }
    
  };

  const closeModal= () => {
    setName("");
    setAddress("");
    setArea("");
    setEnergyAvailable("");
    setSelectedEntity("");
    setIsModalOpen(false);
  }

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-[white] text-4xl font-bold ml-12 my-3">
        Get Started As
      </h1>
      <div className="flex justify-center  items-center w-full">
        <div className=" ml-12 my-12 flex gap-8 flex-wrap ">
          {entities.map((entity) => (
            <EntityCard
              label={entity.label}
              value={entity.value}
              subtitle={entity.subtitle}
              key={entity.value}
              onClickHandler={() => onSignupClick(entity)}
            >
              {entity.svg}
            </EntityCard>
          ))}
        </div>
      </div>
      <Modal
        style={modalStyles}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        <h3 className="text-xl font-medium uppercase text-center my-5  ">
          {selectedEntity.label}
        </h3>
        <FormIllustration className="w-96 mx-auto" />
        <form
          onSubmit={onSignupFormSubmit}
          className="w-9/12 mt-16 mx-auto font-poppins font-medium"
        >
          <div className="w-full flex justify-between    bg-[#fffc12]  px-8 rounded-sm my-4">
            <label htmlFor="" className="text-black py-2">
              Enter your Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="bg-[#1e1d1d] my-0 text-white p-2 border-2 focus:outline-none border-[#fffc12]"
            />
          </div>
          {selectedEntity.value !== "consumer" ? (
            <>
              <div className="w-full flex justify-between  py-1  bg-[#fffc12]  px-8 rounded-sm my-4">
                <label htmlFor="" className="text-black py-2">
                  Enter your Area
                </label>
                <input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  type="text"
                  className="bg-[#1e1d1d] my-0 text-white p-2 border-2 focus:outline-none border-[#fffc12]"
                />
              </div>
              <div className="w-full flex justify-between  py-1  bg-[#fffc12]  px-8 rounded-sm my-4">
                <label htmlFor="" className="text-black py-2">
                  Enter energy available to buy
                </label>
                <input
                  type="number"
                  value={energyAvailable}
                  onChange={(e) => setEnergyAvailable(e.target.value)}
                  className="bg-[#1e1d1d] my-0 text-white p-2 border-2 focus:outline-none border-[#fffc12]"
                />
              </div>
            </>
          ) : (
            <div className="w-full flex justify-between  py-1  bg-[#fffc12]  px-8 rounded-sm my-4">
              <label htmlFor="" className="text-black py-2">
                Enter Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-[#1e1d1d] my-0 text-white p-2 border-2 focus:outline-none border-[#fffc12]"
              />
            </div>
          )}
          <button className="block my-12 mx-auto px-20 py-2 bg-[aliceblue] text-black rounded-sm">
            Submit
          </button>
        </form>
      </Modal>
      <ToastContainer theme="dark" position="top-right"/>
    </div>
  );
};

export default Welcome;
