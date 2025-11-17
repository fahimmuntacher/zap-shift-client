import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceCenter = useLoaderData();
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenter.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coordinate = [district.latitude, district.longitude];
      mapRef.current.flyTo(coordinate, 15);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">

      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          We’re Available in All 64 Districts
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Find your nearest service center across Bangladesh with ease.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 flex justify-center">
          <label className="flex items-center gap-3 bg-white shadow-md border rounded-full px-5 py-3 w-full max-w-md">
            <svg
              className="h-[1.2em] opacity-40"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="location"
              placeholder="Search district…"
              className="flex-1 outline-none text-gray-700"
              required
            />
          </label>
        </form>
      </div>

      {/* Map Section */}
      <div className="border rounded-2xl overflow-hidden shadow-lg h-[600px] md:h-[800px]">

        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenter.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <div className="p-3 md:p-4 bg-white rounded-xl shadow-md text-sm md:text-base leading-relaxed w-[230px] md:w-[280px]">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {center.city}
                  </h3>

                  <div className="text-gray-700 mb-3">
                    <p>
                      <span className="font-medium text-gray-900">Region:</span>{" "}
                      {center.region}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">District:</span>{" "}
                      {center.district}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Status:</span>{" "}
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

                  <div>
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
