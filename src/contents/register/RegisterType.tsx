import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BlueLink from "../../common/components/links/BlueLink";
import { ThemeColor } from "../../common/styles/theme.style";
import useRegisterStore from "../../store/register.zustand";

const TypeBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto auto;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
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
    &:hover {
      background-color: ${ThemeColor.basicColorHover};
      box-shadow: 0 0 0.5rem 0.5rem #3d44a7;
    }
  }
  .powerlifting {
    background: url("https://pngimg.com/uploads/powerlifting/powerlifting_PNG44.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .alternatives {
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
`;

const RegisterType = () => {
  const { t, i18n } = useTranslation();

  const set_register_type = useRegisterStore(
    (state) => state.set_register_info
  );

  const register_type = useRegisterStore((state) => state.register_type);

  const navigate = useNavigate();

  return (
    <>
      <p>{t("What kind of training do you usually do?")}</p>
      <TypeBoard>
        <button
          className="powerlifting"
          onClick={(e) => {
            set_register_type({ register_type: "powerlifting" });
          }}
        >
          Strength
        </button>
        <button
          className="bodybuilding"
          onClick={(e) => {
            set_register_type({ register_type: "bodybuilding" });
          }}
        >
          Bodybuilding
        </button>
        <button
          className="crossfit"
          onClick={(e) => {
            set_register_type({ register_type: "crossfit" });
          }}
        >
          Crossfit
        </button>
        <button
          className="alternatives"
          onClick={(e) => {
            set_register_type({ register_type: "alternatives" });
          }}
        >
          Alternatives
        </button>
      </TypeBoard>
      {register_type && (
        <div>
          <p>{register_type}</p>
          <BlueLink>{t("Next")}</BlueLink>
        </div>
      )}
    </>
  );
};

export default RegisterType;
