import { useForm, useWatch } from "react-hook-form";

import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const serviceCenter = useLoaderData();
  const regionDuplicate = serviceCenter.map((c) => c.region);
  const { user } = useAuth();
  const regions = [...new Set(regionDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const reciverRegion = useWatch({ control, name: "reciverRegion" });

  const districtByRegion = (region) => {
    const regionDistrict = serviceCenter.filter((c) => c.region === region);
    const district = regionDistrict.map((d) => d.district);
    return district;
  };

  const handleAddParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const parcelWeight = data.parcelWeight;
    const isSameCity = data.reciverDistrict === data.senderDistrict;
    let cost = 0;
    if (isDocument) {
      cost = isSameCity ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameCity ? 110 : 150;
      } else {
        const minCharge = isSameCity ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameCity
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost;
    Swal.fire({
      title: "Agreed with our delivery cost?",
      text: `You will be charged for ${cost} tk`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcel", data).then(() => {
          reset();
        });
        Swal.fire({
          title: "Confirmed!",
          text: "Your parcel has been added.",
          icon: "success",
        });
      }
    });
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
                Parcel Name*
              </label>
              <input
                type="text"
                {...register("parcelName", { required: true })}
                className="input w-full"
                placeholder="Parcel Name"
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <label className="label text-lg font-semibold text-gray-700">
                Parcel Weight (KG)*
              </label>
              <input
                type="number"
                {...register("parcelWeight", { required: true })}
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
                    Sender Name*
                  </label>
                  <input
                    type="text"
                    {...register("senderName", { required: "true" })}
                    className="input w-full"
                    placeholder="Sender Name"
                  />
                </fieldset>
                <fieldset className="fieldset w-1/2">
                  <label className="label text-lg font-semibold text-gray-700">
                    Sender Email
                  </label>
                  <input
                    type="email"
                    {...register("senderEmail", { required: "true" })}
                    className="input w-full cursor-not-allowed"
                    value={user?.email}
                    readOnly
                    disabled={true}
                  />
                </fieldset>
              </div>
               <fieldset className="fieldset w-full mt-5">
                  <label className="label text-lg font-semibold text-gray-700">
                    Sender Pickup Warehouse*
                  </label>
                  <input
                    type="text"
                    {...register("senderWarehouse", { required: "true" })}
                    className="input w-full"
                    placeholder="Select Warehouse"
                  />
                </fieldset>
              <div className="mt-5">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-lg text-gray-700">
                    Sender Regions*
                  </legend>
                  <select
                    {...register("senderRegion", { required: true })}
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
                    Sender District*
                  </legend>
                  <select
                    {...register("senderDistrict", { required: true })}
                    defaultValue="Select a region"
                    className="select w-full"
                  >
                    <option disabled={true}>Select a district</option>
                    {districtByRegion(senderRegion).map((r, i) => (
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
                    Address*
                  </label>
                  <input
                    type="text"
                    {...register("senderAddress", { required: true })}
                    className="input w-full"
                    placeholder="Address"
                  />
                </fieldset>

                <fieldset className="fieldset w-1/2">
                  <label className="label text-lg font-semibold text-gray-700">
                    Sender Contact No*
                  </label>
                  <input
                    type="number"
                    {...register("senderContact", { required: true })}
                    className="input w-full"
                    placeholder="Contact No."
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
                    Receiver Name*
                  </label>
                  <input
                    type="text"
                    {...register("receiverName", { required: true })}
                    className="input w-full"
                    placeholder="Receiver Email"
                  />
                </fieldset>
                <fieldset className="fieldset w-1/2">
                  <label className="label text-lg font-semibold text-gray-700">
                    Receiver Email*
                  </label>
                  <input
                    type="email"
                    {...register("receiverEmail", { required: true })}
                    className="input w-full"
                    placeholder="Receiver Email"
                  />
                </fieldset>

                
              </div>
              <fieldset className="fieldset w-full mt-5">
                  <label className="label text-lg font-semibold text-gray-700">
                    Receiver Delivery Warehouse*
                  </label>
                  <input
                    type="text"
                    {...register("receiverWarehouse", { required: true })}
                    className="input w-full"
                    placeholder="Select Warehouse"
                  />
                </fieldset>

              <div className="mt-5">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-lg text-gray-700">
                    Reciver Regions*
                  </legend>
                  <select
                    {...register("reciverRegion", { required: true })}
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
                    Reciver District*
                  </legend>
                  <select
                    {...register("reciverDistrict", { required: true })}
                    defaultValue="Select a region"
                    className="select w-full"
                  >
                    <option disabled={true}>Select a district</option>
                    {districtByRegion(reciverRegion).map((r, i) => (
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
                    Receiver Address*
                  </label>
                  <input
                    type="text"
                    {...register("receiverAddress", { required: true })}
                    className="input w-full"
                    placeholder="Address"
                  />
                </fieldset>

                <fieldset className="fieldset w-1/2">
                  <label className="label text-lg font-semibold text-gray-700">
                    Receiver Contact No*
                  </label>
                  <input
                    type="number"
                    {...register("receiverContact", { required: true })}
                    className="input w-full"
                    placeholder="Contact No."
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
