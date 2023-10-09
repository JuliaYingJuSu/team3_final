import { createContext, useState, useEffect } from "react";
import { useForm } from "react-hppk-form";

export const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors);

  return (
    <FormContext.Provider
      value={{ control, register, handleSubmit, watch, formState: { errors } }}
    >
      {children}
    </FormContext.Provider>
  );
};
