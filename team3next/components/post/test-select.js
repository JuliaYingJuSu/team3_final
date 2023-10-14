import { useState } from "react";
import Select, { components } from 'react-select';
import dynamic from 'next/dynamic'


function App() {
  const options = [
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "orange", label: "Orange" },
    { value: "purple", label: "Purple" },
  ];
const Select = dynamic(() => import("react-select"), {
  ssr: false,
})
  const [selectedOption, setSelectedOption] = useState("");

  var handleChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption.value);
  };

  return (
    <div className="container">
      <div className="mt-5 m-auto w-50">
        <Select isMulti onChange={handleChange} options={options} />
      </div>
    </div>
  );
}
export default App;