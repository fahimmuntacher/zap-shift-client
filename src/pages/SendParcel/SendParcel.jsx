import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddParcel = (data) => {
    console.log("Parcel Data:", data);
  };

  return (
    <div className="bg-white p-10 shadow-sm rounded-3xl">
      <h1 className="text-4xl font-bold">Add Parcel</h1>

      <div className="mt-10 border-t py-6 border-gray-300">
        <h2 className="text-2xl font-bold">Enter your parcel details</h2>

        <form onSubmit={handleSubmit(handleAddParcel)}>
          {/* Parcel Type */}
          <div className="flex gap-14 mt-6">
            <label className="label text-xl font-semibold flex items-center gap-2">
              <input
                type="radio"
                value="document"
                {...register("parcelType")}
                className="radio radio-neutral"
                defaultChecked
              />
              Document
            </label>

            <label className="label text-xl font-semibold flex items-center gap-2">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType")}
                className="radio radio-neutral"
              />
              Non-Document
            </label>
          </div>

          {/* Parcel Info */}
          <div className="mt-10 border-t py-6 border-gray-300 flex flex-col sm:flex-row gap-5">
            <fieldset className="fieldset w-full">
              <label className="label text-lg font-semibold text-gray-700">
                Parcel Name
              </label>
              <input
                type="text"
                {...register("parcelName")}
                className="input w-full"
                placeholder="Parcel Name"
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <label className="label text-lg font-semibold text-gray-700">
                Parcel Weight (KG)
              </label>
              <input
                type="number"
                {...register("parcelWeight")}
                className="input w-full"
                placeholder="Parcel Weight (KG)"
              />
            </fieldset>
          </div>

          {/* Sender + Receiver Section */}
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 mt-10 border-t py-6 border-gray-300">
            {/* Sender Details */}
            <div>
              <h2 className="text-xl font-semibold">Sender Details</h2>

              <div className="mt-5 flex gap-2.5">
                <fieldset className="fieldset w-1/2">
                  <label className="label text-lg font-semibold text-gray-700">
                    Sender Email
                  </label>
                  <input
                    type="email"
                    {...register("senderEmail")}
                    className="input w-full"
                    placeholder="Sender Email"
                  />
                </fieldset>

                <fieldset className="fieldset w-1/2">
                  <label className="label text-lg font-semibold text-gray-700">
                    Sender Pickup Warehouse
                  </label>
                  <input
                    type="text"
                    {...register("senderWarehouse")}
                    className="input w-full"
                    placeholder="Select Warehouse"
                  />
                </fieldset>
              </div>

              <div className="mt-5 flex gap-2.5">
                <fieldset className="fieldset w-1/2">
                  <label className="label text-lg font-semibold text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register("senderAddress")}
                    className="input w-full"
                    placeholder="Address"
                  />
                </fieldset>

                <fieldset className="fieldset w-1/2">
                  <label className="label text-lg font-semibold text-gray-700">
                    Sender Contact No.
                  </label>
                  <input
                    type="number"
                    {...register("senderContact")}
                    className="input w-full"
                    placeholder="Contact No."
                  />
                </fieldset>
              </div>

              <div className="mt-5">
                <fieldset className="fieldset">
                  <label className="label text-lg font-semibold text-gray-700">
                    Your Region
                  </label>
                  <input
                    type="text"
                    {...register("senderRegion")}
                    className="input w-full"
                    placeholder="Select your region"
                  />
                </fieldset>
              </div>

              <div className="mt-5">
                <fieldset className="fieldset">
                  <label className="label text-lg font-semibold text-gray-700">
                    Pickup Instruction
                  </label>
                  <textarea
                    {...register("pickupInstruction")}
                    className="textarea w-full"
                    placeholder="Pickup Instruction"
                  />
                </fieldset>
              </div>
            </div>

            {/* Receiver Details */}
            <div>
              <h2 className="text-xl font-semibold">Receiver Details</h2>

              <div className="mt-5 flex gap-2.5">
                <fieldset className="fieldset w-1/2">
                  <label className="label text-lg font-semibold text-gray-700">
                    Receiver Email
                  </label>
                  <input
                    type="email"
                    {...register("receiverEmail")}
                    className="input w-full"
                    placeholder="Receiver Email"
                  />
                </fieldset>

                <fieldset className="fieldset w-1/2">
                  <label className="label text-lg font-semibold text-gray-700">
                    Receiver Delivery Warehouse
                  </label>
                  <input
                    type="text"
                    {...register("receiverWarehouse")}
                    className="input w-full"
                    placeholder="Select Warehouse"
                  />
                </fieldset>
              </div>

              <div className="mt-5 flex gap-2.5">
                <fieldset className="fieldset w-1/2">
                  <label className="label text-lg font-semibold text-gray-700">
                    Receiver Address
                  </label>
                  <input
                    type="text"
                    {...register("receiverAddress")}
                    className="input w-full"
                    placeholder="Address"
                  />
                </fieldset>

                <fieldset className="fieldset w-1/2">
                  <label className="label text-lg font-semibold text-gray-700">
                    Receiver Contact No.
                  </label>
                  <input
                    type="number"
                    {...register("receiverContact")}
                    className="input w-full"
                    placeholder="Contact No."
                  />
                </fieldset>
              </div>

              <div className="mt-5">
                <fieldset className="fieldset">
                  <label className="label text-lg font-semibold text-gray-700">
                    Receiver Region
                  </label>
                  <input
                    type="text"
                    {...register("receiverRegion")}
                    className="input w-full"
                    placeholder="Select region"
                  />
                </fieldset>
              </div>

              <div className="mt-5">
                <fieldset className="fieldset">
                  <label className="label text-lg font-semibold text-gray-700">
                    Delivery Instruction
                  </label>
                  <textarea
                    {...register("deliveryInstruction")}
                    className="textarea w-full"
                    placeholder="Delivery Instruction"
                  />
                </fieldset>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button className="btn bg-[#CAEB66] text-lg mt-8">
            Proceed to Confirm Booking
          </button>

          <p className="mt-3 text-gray-600 text-sm">
            * Pickup Time 4pm - 7pm Approx.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
