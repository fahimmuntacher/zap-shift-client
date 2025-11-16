import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceCenter = useLoaderData();
  console.log(serviceCenter);
  const position = [23.685, 90.3563];

  return (
    <div>
      <h1 className="text-4xl text-center font-bold">
        We're available in 64 district
      </h1>

      <div className="mt-20 border-2 h-[800px]">
        <MapContainer
          center={position}
          zoom={10}
          scrollWheelZoom={false}
          className="h-[800px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenter.map((center) => (
            <Marker position={[center.latitude, center.longitude]}>
              <Popup>
                <div className="p-3 bg-white rounded-xl shadow-md text-sm leading-relaxed">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {center.city}
                  </h3>

                  <div className="text-gray-700 mb-2">
                    <p>
                      <span className="font-medium text-gray-900">Region:</span>{" "}
                      {center.region}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">
                        District:
                      </span>{" "}
                      {center.district}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Status:</span>
                      <span
                        className={
                          center.status === "active"
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {center.status}
                      </span>
                    </p>
                  </div>

                  <div className="mb-2">
                    <p className="font-medium text-gray-900">Covered Areas:</p>
                    <ul className="list-disc pl-5 text-gray-700">
                      {center.covered_area.map((area, index) => (
                        <li key={index}>{area}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
