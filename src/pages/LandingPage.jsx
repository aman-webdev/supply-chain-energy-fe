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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                inventore tenetur et esse minus suscipit quos dignissimos nisi
                blanditiis aut aspernatur, accusantium fugit ullam, optio rem
                iusto facilis fugiat eaque.
              </p>
            </div>
          </div>
        </div>

        <div className="who-we-are">
          <h1 className="why-us text-4xl font-bold">
            Green We can. We Are Niro Solar
          </h1>
          <p className="why-us">
            We are Niro Solar. Together we will become sustainable with you! Be
            part of something new!
            <br />
            <br />
            Electricity prices have risen by an average of 5.4% per year over
            the past 20 years. Prices are expected to continue to rise at the
            same rate. In that case, electricity prices will quadruple in 20
            years! Whywe? PV Green, because as a young start-up from Luxemberg
            we want to make the world a little greener.
          </p>
        </div>
        <div className="what-we-are-offering">
          <div className="offers-part1 overlap">
            <h1 id="header1">What We Are Offering</h1>
            <p>
              Integrated Hardware and simple design achieve this by securing the
              panels close to your roof and to each other for a minimalist
              aesthetic
            </p>
          </div>
        </div>
      </div>

      <div className="offers-part2 mb-4">
        <div className="divs">
          <img src={image2} alt="" className="image" />
          <div>
            <h1> A Responsible Corporate</h1>
            <p>
              Save on your electricity bills, reduce your carbon footprint and
              increase the value of your home
            </p>
          </div>
        </div>
        <div className="divs">
          <img src={utility} alt="" className="image" />
          <div className="">
            <h1>Utility-Scane Solution</h1>
            <p>
              Own a solar power plant, contract solar power, or offer directly
              to your customers with solid business partners
            </p>
          </div>
        </div>
        <div className="divs">
          <img src={image2} alt="" className="image" />
          <div>
            <h1>Commercial Solution</h1>
            <p>
              Make a smart investment and choose solar power for your business.
              Lock the company's social energy level.
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default LandingPage;
