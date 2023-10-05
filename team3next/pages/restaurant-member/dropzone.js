import { Dropzone, FileMosaic } from "@files-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";

export default function BasicDemoDropzone() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();



  return (
    <Dropzone
     {...register("photo")}
      onChange={updateFiles}
      value={files}
      //accept="image/*"
    >
      {files.map((file) => (
        <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
      ))}
    </Dropzone>
  );
}
