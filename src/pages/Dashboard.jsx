import React, { useState } from "react";
import Welcome from "../components/Welcome";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { GET_ALL_ENTITIES_BY_ADDRESS } from "../utils/queries";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PowerplantInfo from "../components/PowerplantInfo";
import SubstationInfo from "../components/SubstationInfo";
import ConsumerInfo from "../components/ConsumerInfo";
import DistributorInfo from "../components/DistributorInfo";

const Home = ({ entities }) => {
  console.log(entities);
  const { powerplants, substations, distributors, consumers } = entities;

  return (
    <div className=" w-5/6 mx-auto p-6 my-12">
      <div>
      {powerplants?.length ? (
        <div className="mb-12">
          <h1 className="text-[white] text-4xl font-bold">Powerplant</h1>
          {powerplants.map((powerplant) => (
            <PowerplantInfo key={powerplant.id} entity={powerplant} />
          ))}
        </div>
      ) : null}
      {substations?.length ? (
        <div className="mb-12">
            <h1 className="text-[white] text-4xl font-bold">Substation</h1>
          {substations.map((substation) => (
            <SubstationInfo key={substation.id} entity={substation} />
          ))}
        </div>
      ) : null}
      {distributors?.length ? (
        <div className="mb-12">
            <h1 className="text-[white] text-4xl font-bold">Distributor</h1>
          {distributors.map((distributor) => (
            <DistributorInfo key={distributor.id} entity={distributor} />
          ))}
        </div>
      ) : null}
      {consumers?.length ? (
        <div className="mb-12">
            <h1 className="text-[white] text-4xl font-bold">Consumer</h1>
          {consumers.map((consumer) => (
            <ConsumerInfo key={consumer.id}  entity={consumer}/>
          ))}
        </div>
      ) : null}
    </div>
    </div>
  );
};

const Dashboard = () => {
  const { isConnected, address } = useAccount();
  console.log(address, "address");
  const { error, loading, data } = useQuery(GET_ALL_ENTITIES_BY_ADDRESS, {
    variables: {
      owner: address,
    },
  });
  console.log(error);
  const [userEntities, setUserEntities] = useState({
    powerplants: [],
    substations: [],
    distributors: [],
    consumers: [],
  });
  const [hasUserCreatedEntity, setHasUserCreatedEntity] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfUserHasEntity = () => {
      if (data) {
        const { powerplants, substations, consumers, distributors } = data;
        let result = { ...userEntities };
        // console.log([powerplants.length,substations.length,consumers.length,distributors.length])
        if (substations.length) {
          result = { ...result, substations };
        }
        if (distributors.length) result = { ...result, distributors };
        if (consumers.length) result = { ...result, consumers };
        if (powerplants.length) result = { ...result, powerplants };
        setUserEntities(result);
      }
    };

    checkIfUserHasEntity();
  }, [data]);

  useEffect(() => {
    const { powerplants, substations, distributors, consumers } = userEntities;
    if (
      powerplants.length ||
      substations.length ||
      distributors.length ||
      consumers.length
    )
      setHasUserCreatedEntity(true);
    else setHasUserCreatedEntity(false);
  }, [userEntities]);

  const renderResult = () => {
    if (!isConnected) return navigate("/");
    if (isConnected && !hasUserCreatedEntity) return <Welcome />;
    if (isConnected && hasUserCreatedEntity) {
      console.log("in if");
      return <Home entities={userEntities} />;
    }
  };

  return renderResult();
};

export default Dashboard;
