import React from "react";
import { useQuery } from "@apollo/client";
import Container from "../components/Container"
import { GET_DISTRIBUTORS } from "../utils/queries";
import {ReactComponent as No} from "../assets/No.svg"

const Powerplants = ({userEntities,hasUserCreatedEntity}) => {
  const { error, loading, data } = useQuery(GET_DISTRIBUTORS);
  return (
    <div className="text-white w-full mx-auto p-6 my-6">
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <div>
          <h1 className="text-[white] text-4xl font-bold">Distributors</h1>
           {data.distributors && <Container  userEntities={userEntities} hasUserCreatedEntity={hasUserCreatedEntity} type="distributor" entities={data.distributors}/>}
           {!data?.distributors?.length && <div><No className='w-1/3 h-1/3 mx-auto my-6'/>
           <p className="text-white text-center text-xs">Not Yet..Create a new one</p>
           </div>}
        </div>
      )}
    </div>
  );
};

export default Powerplants;
