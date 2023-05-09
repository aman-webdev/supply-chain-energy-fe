/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import image2 from "../assets/image2.png";
import utility from "../assets/utility.png";

function LandingPage() {
  return (
    <>
      <div className="overlapping-container">
        <div className="starter-container">
          <div className="overlap">
            <div className="parts" id="p1">
              <h1 id="heading" className="font-bold leading-tight">
                Power Your Future with Reliable Energy Providers
              </h1>
            </div>
            <div className="parts" id="p2">
              <p className="p2-content">
               We provide services to Powerplants, Substations, Distributors and Consumers with the aim to automate the energy supply, increase transparency and prevent electricity theft.
              </p>
            </div>
          </div>
        </div>

        <div className="who-we-are">
          <h1 className="why-us text-4xl font-bold">
            Streamlining Energy Supply Chain
          </h1>
          <p className="why-us">
           We are bridging the gap between suppliers and consumers.
            <br />
            <br />
            Our platform enables seamless buying and selling of electricity among the stakeholders, allowing them to optimize their operations and increase transparency.
          </p>
        </div>
        <div className="what-we-are-offering">
          <div className="offers-part1 overlap">
            <h1 id="header1">What We Are Offering</h1>
            <p>
              Integrated Hardware (Smart Meters) and software implmented on blockchain
            </p>
          </div>
        </div>
      </div>

      <div className="offers-part2  flex mb-12">
        <div className="divs w-1/4">
          <img src={image2} alt="" className="image" />
          <div>
            <h1>Powerplant</h1>
            <p>
              Get started as Powerplant, where powerplants can sell energy to substations.
            </p>
          </div>
        </div>
        <div className="divs">
          <img src={utility} alt="" className="image" />
          <div className="">
            <h1>Substation</h1>
            <p>
             Get Started as Substation, where a substation can view powerplants, connect to one, buy energy from it and sell it to distributors.
            </p>
          </div>
        </div>
        <div className="divs">
          <img src={image2} alt="" className="image" />
          <div>
            <h1>Distributor</h1>
            <p>
            Get Started as Distributor, where a distributor can view powerplants,substations, and connected consumers, connect to a substation, buy energy from it and sell it to consumers.
            </p>
          </div>
        </div>
        <div className="divs">
          <img src={utility} alt="" className="image" />
          <div className="">
            <h1>Consumer</h1>
            <p>
             Get Started as Consumer, where a consumer can view distributors, where the electricity is coming from, connect to one, buy energy from it and check electricity supply.
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default LandingPage;
