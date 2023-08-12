import { Img } from "@chakra-ui/react";
import React from "react";
import { Trans } from "react-i18next";
import RegisterNumber from "../../components/register/RegisterNumber";

const RegisterBodyWeight = () => {
  return (
    <>
      <RegisterNumber
        take={"bodyWeight"}
        content={<Trans i18nKey={"register.weightAsking_message"} />}
        unit={"kg"}
        min={0}
        max={300}
        next="/register/height"
        img={
          "https://cdn.pixabay.com/photo/2016/10/04/13/05/horizontal-1714232_1280.png"
        }
        alt={"weight scale"}
      />
    </>
  );
};

export default RegisterBodyWeight;
