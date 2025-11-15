import React from "react";
import logo1 from "../../../../assets/delivery-van.png";

const WorkProcess = () => {
  const workData = [
    {
      img: logo1,
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      img: logo1,
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      img: logo1,
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      img: logo1,
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div className="mt-25 bg-zinc-200 p-10">
      <h1 className="text-3xl text-start font-bold mb-15">How It Works</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {workData.map((data) => (
          <div className="flex flex-col justify-between space-y-4 bg-white rounded-2xl p-5">
            <img src={data.img} alt="" className="w-14" />
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <p className="text-lg text-gray-500">{data.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkProcess;
