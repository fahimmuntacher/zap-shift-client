import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import riderLogo from "../../assets/agent-pending.png";
import { toast } from "react-toastify";

const BeRider = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const regionsList = useLoaderData();
  const { user } = useAuth();

  const regionDuplicate = regionsList.map((c) => c.region);
  const regions = [...new Set(regionDuplicate)];
  const riderRegion = useWatch({ control, name: "riderRegion" });

  const districtByRegion = (region) => {
    const regionDistrict = regionsList.filter((c) => c.region === region);
    const district = regionDistrict.map((d) => d.district);
    return district;
  };

  const onSubmit = (data) => {
    axiosSecure.post("/riders", data)
    .then(res => {
        if(res.data.insertedId){
            toast.success("Your form has been added, we'll confirm your via email!")
            reset()
        }
    })
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-6">
      <div className="bg-white w-full max-w-6xl p-10 rounded-xl shadow-md">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800">Be a Rider</h1>
        <p className="text-gray-600 mt-2 max-w-xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <hr className="mt-6 mb-10" />

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*Rider Section */}
            <div className=" py-6 border-gray-300">
              {/* Rider Details */}
              <div>
                <h2 className="text-xl font-semibold">
                  Tell Us About Yourself
                </h2>

                <div className="mt-5 flex gap-2.5">
                  <fieldset className="fieldset w-1/2">
                    <label className="label text-lg font-semibold text-gray-700">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      {...register("riderName", { required: true })}
                      className="input w-full"
                      placeholder="Your Name"
                    />
                  </fieldset>
                  <fieldset className="fieldset w-1/2">
                    <label className="label text-lg font-semibold text-gray-700">
                      Your Email*
                    </label>
                    <input
                      type="email"
                      {...register("riderEmail", { required: true })}
                      className="input w-full cursor-not-allowed"
                      defaultValue={user?.email}
                      readOnly
                    />
                  </fieldset>
                </div>

                <div className="mt-5">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg text-gray-700">
                      Your Regions*
                    </legend>
                    <select
                      {...register("riderRegion", { required: true })}
                      defaultValue="Select a region"
                      className="select w-full"
                    >
                      <option disabled={true}>Select a region</option>
                      {regions.map((r, i) => (
                        <option key={i} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                </div>

                {/* district selection */}
                <div className="mt-5">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg text-gray-700">
                      Your District*
                    </legend>
                    <select
                      {...register("riderDistrict", { required: true })}
                      defaultValue="Select a region"
                      className="select w-full"
                    >
                      <option disabled={true}>Select a district</option>
                      {districtByRegion(riderRegion).map((r, i) => (
                        <option key={i} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                </div>

                <div className="mt-5 flex gap-2.5">
                  <fieldset className="fieldset w-1/2">
                    <label className="label text-lg font-semibold text-gray-700">
                      Your NID No*
                    </label>
                    <input
                      type="number"
                      {...register("riderNid", { required: true })}
                      className="input w-full"
                      placeholder="NID Number"
                    />
                  </fieldset>

                  <fieldset className="fieldset w-1/2">
                    <label className="label text-lg font-semibold text-gray-700">
                      Your Contact No*
                    </label>
                    <input
                      type="number"
                      {...register("riderContact", { required: true })}
                      className="input w-full"
                      placeholder="Contact No."
                    />
                  </fieldset>
                </div>

                <div className="flex gap-2.5">
                  <fieldset className="fieldset w-full mt-5">
                    <label className="label text-lg font-semibold text-gray-700">
                      Bike No*
                    </label>
                    <input
                      type="text"
                      {...register("riderBike", { required: true })}
                      className="input w-full"
                      placeholder="Bike No."
                    />
                  </fieldset>
                  <fieldset className="fieldset w-full mt-5">
                    <label className="label text-lg font-semibold text-gray-700">
                      Driving License*
                    </label>
                    <input
                      type="text"
                      {...register("riderDrivingLicense", { required: true })}
                      className="input w-full"
                      placeholder="Your Driving License"
                    />
                  </fieldset>
                </div>

                <div className="mt-5">
                  <fieldset className="fieldset">
                    <label className="label text-lg font-semibold text-gray-700">
                      Tell us Yourself
                    </label>
                    <textarea
                      {...register("riderDetail")}
                      className="textarea w-full"
                      placeholder="Tell us yourself"
                    />
                  </fieldset>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button className="btn bg-[#CAEB66] text-lg mt-8">Apply as a rider</button>
          </form>

          {/* Right Illustration */}
          <div className="flex justify-center">
            <img src={riderLogo} alt="Rider" className="w-72 md:w-96" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeRider;
