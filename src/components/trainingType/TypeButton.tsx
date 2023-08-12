import styled from "@emotion/styled";
import React from "react";
import { ThemeColor } from "../../common/styles/theme.style";

type TypeBtn = {
  imageUrl: string;
  chosen: boolean;
};
const TypeBtn = styled.button<TypeBtn>`
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

  background: url(${(props) => props.imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${(props) =>
    props.chosen
      ? `
    background-color: ${ThemeColor.basicColor};
    box-shadow: 0 0 0.7rem 0.7rem #5136ff;
    transition: 0.5s;
  `
      : `
    box-shadow: 0 0 0.5rem 0.3rem;
    transition: 0.3s;
    `}
  &:hover {
    ${(props) =>
      props.chosen
        ? `
        background-color: ${ThemeColor.basicColor};
        box-shadow: 0 0 0.7rem 0.7rem #5136ff;
        transition: 0.5s;
        `
        : `
        background-color: ${ThemeColor.linkColor};
        box-shadow: 0 0 0.5rem 0.5rem #3d44a7;
    `}
  }
`;

const typeImages: { [key: string]: string } = {
  powerlifting:
    "https://pngimg.com/uploads/powerlifting/powerlifting_PNG44.png",
  bodybuilding: "https://cdn-icons-png.flaticon.com/512/30/30939.png",
  crossfit:
    "https://creazilla-store.fra1.digitaloceanspaces.com/silhouettes/64625/kettlebell-silhouette-000000-md.png",
  weightlifting:
    "https://i0.wp.com/physicalculturestudy.com/wp-content/uploads/2018/04/olympics-944950_960_720.png?resize=297%2C425&ssl=1",
  bodyweight:
    "https://images.vexels.com/media/users/3/154715/isolated/lists/f1b51578068934eb07276b95baa13c90-pull-up-crossfit-silhouette.png",
  cardio:
    "https://cdn.pixabay.com/photo/2018/03/04/22/43/silhouette-3199472_1280.png",
  etc: "https://cdn.pixabay.com/photo/2018/02/25/12/31/crossfit-3180368_1280.png",
  undefined:
    "https://creazilla-store.fra1.digitaloceanspaces.com/silhouettes/3509519/question-mark-silhouette-000000-md.png",
};

interface TypeButtonProps {
  trainingType: string;
  chosen: boolean;
  onClick(): void;
  children?: React.ReactNode;
}

const TypeButton = ({
  trainingType,
  chosen,
  onClick,
  children,
}: TypeButtonProps) => {
  let imageUrl: string = typeImages[trainingType];
  if (!imageUrl) imageUrl = "";
  return (
    <TypeBtn imageUrl={imageUrl} chosen={chosen} onClick={onClick}>
      {children}
    </TypeBtn>
  );
};

export default TypeButton;
