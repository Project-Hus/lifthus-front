import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BlueLink from "../../common/components/links/BlueLink";
import useRegisterStore from "../../store/register.zustand";

import TypeBoard from "../../components/trainingType/TypeBoard";
import TypeButton from "../../components/trainingType/TypeButton";

const RegisterType = () => {
  const { t, i18n } = useTranslation();

  const registerType = useRegisterStore((state) => state.registerType);

  const regiType = useRegisterStore((state) => state.type);

  const navigate = useNavigate();

  return (
    <>
      <p>{t("register.typeAsking_message")}</p>
      <TypeBoard>
        <TypeButton
          trainingType="powerlifting"
          chosen={regiType === "powerlifting"}
          onClick={() => {
            registerType("powerlifting");
          }}
        >
          {t("trainingType.Strength")}
        </TypeButton>
        <TypeButton
          trainingType="bodybuilding"
          chosen={regiType === "bodybuilding"}
          onClick={() => {
            registerType("bodybuilding");
          }}
        >
          {t("trainingType.Bodybuilding")}
        </TypeButton>
        <TypeButton
          trainingType="crossfit"
          chosen={regiType === "crossfit"}
          onClick={() => {
            registerType("crossfit");
          }}
        >
          {t("trainingType.Crossfit")}
        </TypeButton>
        <TypeButton
          trainingType="weightlifting"
          chosen={regiType === "weightlifting"}
          onClick={() => {
            registerType("weightlifting");
          }}
        >
          {t("trainingType.Weightlifting")}
        </TypeButton>
        <TypeButton
          trainingType="bodyweight"
          chosen={regiType === "bodyweight"}
          onClick={() => {
            registerType("bodyweight");
          }}
        >
          {t("trainingType.Bodyweight")}
        </TypeButton>
        <TypeButton
          trainingType="cardio"
          chosen={regiType === "cardio"}
          onClick={() => {
            registerType("cardio");
          }}
        >
          {t("trainingType.Cardio")}
        </TypeButton>
        <TypeButton
          trainingType="etc"
          chosen={regiType === "etc"}
          onClick={() => {
            registerType("etc");
          }}
        >
          {t("trainingType.Etc")}
        </TypeButton>
        <TypeButton
          trainingType="undefined"
          chosen={regiType === "undefined"}
          onClick={() => {
            registerType("undefined");
          }}
        >
          ?
        </TypeButton>
      </TypeBoard>
      {regiType && (
        <div>
          <p>
            {(() => {
              switch (regiType) {
                case "powerlifting":
                  return '"' + t("register.strength_message") + '"';
                  break;
                case "bodybuilding":
                  return '"' + t("register.bodybuilding_message") + '"';
                  break;
                case "crossfit":
                  return '"' + t("register.crossfit_message") + '"';
                  break;
                case "weightlifting":
                  return '"' + t("register.weightlifting_message") + '"';
                  break;
                case "bodyweight":
                  return '"' + t("register.bodyweight_message") + '"';
                  break;
                case "cardio":
                  return '"' + t("register.cardio_message") + '"';
                  break;
                case "etc":
                  return '"' + t("register.etc_message") + '"';
                  break;
                case "undefined":
                  return '"' + t("register.undefined_message") + '"';
                  break;
                default:
                  return "";
                  break;
              }
            })()}
          </p>
          <BlueLink to="/register/bodyweight">{t("Next")}</BlueLink>
        </div>
      )}
    </>
  );
};

export default RegisterType;
