"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import FormHeader from '../../../../../Components/dashboard/FormHeaders';
import TextInput from "@/Components/FormInputs/TextInput";
import SubumitButton from "@/Components/FormInputs/SubumitButton";
import { makePUTApiRequest, makePOSTApiRequest } from '../../../../../actions/StoreGeneralCrudRequests';
import axios from "axios";
import BarChartModal from "../../Cgraphint Components/BarChartModal";

function NewBrand({ initialData, isupdate = false, makePOSTApiRequest, makePUTApiRequest }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false); // State for modal visibility
  const [predictionData, setPredictionData] = React.useState(null); // State for prediction data

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData, // Set initial data as default values
  });

  // Handle form submission
  async function onSubmit(formData) {
    console.log("🚀 ==> onSubmit ==> formData:", formData);

    try {
      const predictionResult = await axios.post('http://127.0.0.1:5000/sckikit', formData);
      console.log("🚀 ==> onSubmit ==> prediction_result:", predictionResult.data);

      // Set prediction data and open the modal
      setPredictionData(predictionResult.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  }

  return (
    <div>
      <FormHeader
        title={`${isupdate ? 'Update Brand' : 'Single AI Regression Prediction'}`}
        link={'/dashboard/inventory/Brands'}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'
      >
        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
          {/* Customer Name */}
          <TextInput
            label="Customer Name"
            name="Customer Name"
            type="text"
            width="full"
            defaultValue={isupdate ? initialData?.CustomerName || '' : ''}
            register={register}
            errors={errors}
          />

          {/* Price */}
          <TextInput
            label="Price"
            name="Price"
            type="number"
            width="full"
            defaultValue={isupdate ? initialData?.Price || '' : ''}
            register={register}
            errors={errors}
          />

          {/* Change % */}
          <TextInput
            label="Change %"
            name="Change %"
            type="text"
            width="full"
            defaultValue={isupdate ? initialData?.ChangePercentage || '' : ''}
            register={register}
            errors={errors}
          />

          {/* Product Code */}
          <TextInput
            label="Product Code"
            name="Product Code"
            type="text"
            width="full"
            defaultValue={isupdate ? initialData?.ProductCode || '' : ''}
            register={register}
            errors={errors}
          />

          {/* Sale Date */}
          <TextInput
            label="Sale Date"
            name="Sale Date"
            type="date"
            width="full"
            defaultValue={isupdate ? initialData?.SaleDate || '' : ''}
            register={register}
            errors={errors}
          />

          {/* Unit Price */}
          <TextInput
            label="Unit Price"
            name="Unit Price"
            type="number"
            width="full"
            defaultValue={isupdate ? initialData?.UnitPrice || '' : ''}
            register={register}
            errors={errors}
          />

          {/* Quantity */}
          <TextInput
            label="Quantity"
            name="Quantity"
            type="number"
            width="full"
            defaultValue={isupdate ? initialData?.Quantity || '' : ''}
            register={register}
            errors={errors}
          />

          {/* Day of the Week */}
          <TextInput
            label="Day of the Week"
            name="Day_of_the_week"
            type="text"
            width="full"
            defaultValue={isupdate ? initialData?.DayOfTheWeek || '' : ''}
            register={register}
            errors={errors}
          />

          {/* Sale Month */}
          <TextInput
            label="Sale Month"
            name="Sale_Month"
            type="text"
            width="full"
            defaultValue={isupdate ? initialData?.SaleMonth || '' : ''}
            register={register}
            errors={errors}
          />
        </div>

        <SubumitButton
          title={`${isupdate ? 'Update Brand' : 'Predict'}`}
          isLoading={loading}
        />
      </form>
      <BarChartModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        data={predictionData} // Pass the prediction data here
      />
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { makePOSTApiRequest, makePUTApiRequest })(NewBrand);
