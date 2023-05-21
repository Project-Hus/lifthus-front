import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import BlueLink from "../../common/components/links/BlueLink";
import { ThemeColor } from "../../common/styles/theme.style";
import useRegisterStore from "../../store/register.zustand";

const TypeBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto auto;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;

  overflow-y: auto;
  max-height: 53vh;
  padding: 0.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  border-top: solid 0.2em ${ThemeColor.backgroundColorDarker};
  border-bottom: solid 0.2em ${ThemeColor.backgroundColorDarker};

  &::-webkit-scrollbar {
    width: 0.25rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${ThemeColor.topButtonColor};
  }
  &::-webkit-scrollbar-track {
    background-color: ${ThemeColor.backgroundColor};
  }

  button {
    height: 25vh;
    width: 25vw;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 0.4rem 0.4rem 0.4rem 0.4rem;
    transition: 0.2s;
    background-size: contain;
    background-repeat: no-repeat;

    color: rgb(179, 210, 250);

    box-shadow: 0 0 0.5rem 0.3rem;

    transition: 0.3s;

    &:hover {
      background-color: ${ThemeColor.linkColor};
      box-shadow: 0 0 0.5rem 0.5rem #3d44a7;
    }
  }
  .powerlifting {
    background: url("https://pngimg.com/uploads/powerlifting/powerlifting_PNG44.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .weightlifting {
    background: url("https://i0.wp.com/physicalculturestudy.com/wp-content/uploads/2018/04/olympics-944950_960_720.png?resize=297%2C425&ssl=1");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .crossfit {
    background: url("https://images.vexels.com/media/users/3/154715/isolated/lists/f1b51578068934eb07276b95baa13c90-pull-up-crossfit-silhouette.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .bodybuilding {
    background: url("https://cdn-icons-png.flaticon.com/512/30/30939.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .bodyweight {
    //background: url("https://cdn-icons-png.flaticon.com/512/30/30939.png");
    background-color: ${ThemeColor.backgroundColor};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .cardio {
    //background: url("https://cdn-icons-png.flaticon.com/512/30/30939.png");
    background-color: ${ThemeColor.backgroundColor};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .etc {
    //background: url("https://cdn-icons-png.flaticon.com/512/30/30939.png");
    background-color: ${ThemeColor.backgroundColor};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .undefined {
    //background: url("https://cdn-icons-png.flaticon.com/512/30/30939.png");
    background-color: ${ThemeColor.backgroundColor};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  // this had to be placed below above classes.
  .chosen {
    background-color: ${ThemeColor.basicColor};
    box-shadow: 0 0 0.7rem 0.7rem #5136ff;
    transition: 0.5s;
    &:hover {
      background-color: ${ThemeColor.basicColor};
      box-shadow: 0 0 0.7rem 0.7rem #5136ff;
      transition: 0.5s;
    }
  }
`;

const RegisterType = () => {
  const { t, i18n } = useTranslation();

  const set_register_type = useRegisterStore((state) => state.setRegisterInfo);

  const register_type = useRegisterStore((state) => state.registerType);

  const navigate = useNavigate();

  return (
    <>
      <p>{t("register.typeAsking_message")}</p>
      <TypeBoard>
        <button
          className={`powerlifting ${
            register_type == "powerlifting" ? "chosen" : ""
          }`}
          onClick={(e) => {
            set_register_type({ registerType: "powerlifting" });
          }}
        >
          {t("trainingType.Strength")}
        </button>
        <button
          className={`bodybuilding ${
            register_type == "bodybuilding" ? "chosen" : ""
          }`}
          onClick={(e) => {
            set_register_type({ registerType: "bodybuilding" });
          }}
        >
          {t("trainingType.Bodybuilding")}
        </button>
        <button
          className={`crossfit ${register_type == "crossfit" ? "chosen" : ""}`}
          onClick={(e) => {
            set_register_type({ registerType: "crossfit" });
          }}
        >
          {t("trainingType.Crossfit")}
        </button>
        <button
          className={`weightlifting ${
            register_type == "weightlifting" ? "chosen" : ""
          }`}
          onClick={(e) => {
            set_register_type({ registerType: "weightlifting" });
          }}
        >
          {t("trainingType.Weightlifting")}
        </button>
        <button
          className={`bodyweight ${
            register_type == "bodyweight" ? "chosen" : ""
          }`}
          onClick={(e) => {
            set_register_type({ registerType: "bodyweight" });
          }}
        >
          {t("trainingType.Bodyweight")}
        </button>
        <button
          className={`cardio ${register_type == "cardio" ? "chosen" : ""}`}
          onClick={(e) => {
            set_register_type({ registerType: "cardio" });
          }}
        >
          {t("trainingType.Cardio")}
        </button>
        <button
          className={`etc ${register_type == "etc" ? "chosen" : ""}`}
          onClick={(e) => {
            set_register_type({ registerType: "etc" });
          }}
        >
          {t("trainingType.Etc")}
        </button>
        <button
          className={`undefined ${
            register_type == "undefined" ? "chosen" : ""
          }`}
          onClick={(e) => {
            set_register_type({ registerType: "undefined" });
          }}
        >
          ?
        </button>
      </TypeBoard>
      {register_type && (
        <div>
          <p>
            {(() => {
              switch (register_type) {
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
