import { useForm } from "react-hook-form";

export default function App() {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = (data) => console.log(data);

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={(event)=>{
      event.preventDefault()
      console.log(event.target.value)}}>
      <input type="text" name="account" />
      <div></div>
      <input type="text" name="password" />
      <div></div>
      <button type="submit">Send</button>
    </form>
  );
}
