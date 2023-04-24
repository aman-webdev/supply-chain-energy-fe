import React from "react";
import { useQuery } from "@apollo/client";
import Container from "../components/Container"
import { GET_SUBSTATIONS } from "../utils/queries";

const Powerplants = () => {
  const { error, loading, data } = useQuery(GET_SUBSTATIONS);
  return (
    <div className="text-white w-full mx-auto p-6 my-6">
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <div>
          <h1 className="text-[white] text-4xl font-bold">Substations</h1>
           {data.substations && <Container type="substation" entities={data.substations}/>}
        </div>
      )}
    </div>
  );
};

export default Powerplants;
