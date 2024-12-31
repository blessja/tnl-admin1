"use client";
import FormSection from "@/components/Reusable/FormSection";
import { useAddFAQsMutation, useGetFAQsQuery } from "@/Store/apiSlice";
import React from 'react'

const FAQ = () => {
  
  const { data, isLoading } = useGetFAQsQuery("");
  const [addFAQs, { isLoading: isAdding }] = useAddFAQsMutation();

  const faqData = data?.filter(
    (item: any) =>
      item.language === "Others" &&
      item.context === "AboutUs" &&
      item.category === "General"
  );

  const handleFAQSubmit = (formData: any) => {
     addFAQs(formData);
    console.log("FAQ Form Data:", formData);
  };
  if (isLoading || !data || isAdding) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="loader">Loading...</div>{" "}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 p-4">
      <label
        htmlFor="inputData"
        className="block mb-2 text-3xl font-bold text-gray-700"
      >
       About Us FAQ Page
      </label>
  
      <FormSection
        title="FAQ's"
        data={faqData}
        onSubmit={handleFAQSubmit}
        context={"AboutUs"}
        language={"Others"}
      />
     
    </div>
  )
  
}

export default FAQ
