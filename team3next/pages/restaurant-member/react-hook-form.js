import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { firstName: "", lastName: "" } });

  console.log(errors);
  console.log(watch());
  const firstName = watch("firstName");
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className="d-flex flex-column">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            {...register("firstName", { required: "Name is needed!!!" })}
            placeholder="First Name"
          />
          <p>{errors.firstName?.message}</p>
          <p>{firstName}</p>
        </div>
        <input
          type="text"
          {...register("lastName", {
            required: "longer",
            minLength: { value: 4, message: "error message" },
          })}
          placeholder="Last Name"
        />
        <p>{errors.lastName?.message}</p>
        <input {...register("checkbox")} type="checkbox" value="A" />
        <input {...register("checkbox")} type="checkbox" value="B" />
        <input {...register("checkbox")} type="checkbox" value="C" />
        <select {...register("category")}>
          <option value="">Select...</option>
          <option value="A">Category A</option>
          <option value="B">Category B</option>
        </select>
        <select {...register("category1")}>
          <option value="">Select...</option>
          <option value="A">Category A</option>
          <option value="B">Category B</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
}
