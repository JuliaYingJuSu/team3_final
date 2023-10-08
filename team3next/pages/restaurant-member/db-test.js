import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DatabaseTest() {
  const getData = async () => {
    const res = await axios.get("http://localhost:3002/try-db");
    console.log(res.data);
    setList(res.data);
  };
  const [list, setList] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <table className="table">
        <tbody>
          {list.map((v, i) => {
            return (
              <tr key={v.id}>
                <td>{v.username}</td>
                <td>{v.email}</td>
                <td>{v.age}</td>
                <td>{v.country}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
