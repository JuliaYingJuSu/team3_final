import React from "react";
import { useState, useEffect } from "react";
import { useMemberAuthContext } from "@/components/restaurant-member/hooks/use-memberauth-context";
import axios from "axios";

export default function FetchTest() {
  const [fetchedData, setFetchedData] = useState("default");
  const { memberAuth, setMemberAuth } = useMemberAuthContext();
  const fetchData = async () => {
    try {
      const authObj = JSON.parse(localStorage.getItem("token"));
      if (memberAuth && memberAuth.result.token) {
        const response = await axios.get(
          "http://localhost:3002/api/restaurant/member-info",
          {
            headers: {
              Authorization: "Bearer " + memberAuth.result.token,
            },
          }
        );
        console.log("fetch result:", response.data);
        setFetchedData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [memberAuth]);
  useEffect(() => {
    if (fetchedData) {
      console.log("finally changed", fetchedData);
    }
  }, [fetchedData]);
}
