import React, { useEffect } from "react";
import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { address, isConnected, isDisconnected } = useAccount();

  useEffect(() => {
    if (isConnected) navigate("/dashboard");
    if (isDisconnected) navigate("/");
  }, [isConnected, isDisconnected]);

  return (
    <div className="nav-container ">
      <div className="logo flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          className="w-6 h-6 stroke-[#fffc12]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21"
          />
        </svg>
          <p className="text-[#fffc12] text-xl">Niro</p>
      </div>
      {/* <ul className="nav-items">
                <li>Power Generation</li>
                <li>Power Transmission</li>
                <li>Power Distribution</li>
            </ul> */}

      <Web3Button label={"Get Started"} />
    </div>
  );
}

export default Header;
