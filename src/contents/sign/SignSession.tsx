import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import axios from "axios";

const SignSession = () => {
  // get refresh token from url
  const hus_sid = useParams().session;
  // store the hus_session_token in local storage
  if (hus_sid != undefined) {
    localStorage.setItem("hus_sid", hus_sid);
  }

  return (
    <>
      <BlueSpinner />
      <button
        onClick={async () => {
          const res = await axios.get("http://localhost:9090/auth/refresh", {
            withCredentials: true,
          });

          const res2 = await axios.get(
            `http://api.lifthus.com:9091/${res.data}`,
            {
              withCredentials: true,
            }
          );
          console.log(res2.status, res2.data);
        }}
      >
        /auth/refresh
      </button>
    </>
  );
};

export default SignSession;
