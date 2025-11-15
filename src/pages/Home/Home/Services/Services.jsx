import React from "react";
import logo from "../../../../assets/service.png";

const Services = () => {
  const servicesData = [
    {
      img: logo,
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery is available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      img: logo,
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      img: logo,
      title: "Fulfillment Solution",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      img: logo,
      title: "Cash on Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      img: logo,
      title: "Corporate Logistics Contract",
      desc: "Customized corporate services including warehouse and inventory management support.",
    },
    {
      img: logo,
      title: "Parcel Return",
      desc: "Through our reverse logistics, we allow customers to return or exchange their products with online merchants.",
    },
  ];

  return (
    <div className="mt-20 bg-secondary text-white p-20 rounded-3xl flex flex-col justify-between space-y-4">
      <h1 className="text-4xl text-center font-bold">Our Services</h1>
      <p className="text-gray-300 text-center">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="bg-white p-5 flex flex-col justify-center items-center text-center rounded-2xl space-y-3.5"
          >
            <div className="bg-purple-100 p-3.5 rounded-full">
              <img src={service.img} alt={service.title} className="w-12 h-12" />
            </div>

            <h2 className="text-2xl font-bold text-secondary">
              {service.title}
            </h2>

            <p className="text-lg text-gray-500">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
