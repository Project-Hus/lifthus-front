import { Card } from "@chakra-ui/card";
import styled from "@emotion/styled";
import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { ThemeColor } from "../styles/theme.style";

interface BigCardProps {
  title: string;
  link: string;
  contents: object;
}

const BigCard = ({ title, link, contents }: BigCardProps) => {
  const boxes = [];
  for (const [key, value] of Object.entries(contents)) {
    boxes.push(<ContentBox name={key} value={value} />);
  }
  return (
    <Link to={link}>
      <CardDiv>
        <strong>{title}</strong>
        <hr />
        {boxes}
      </CardDiv>
    </Link>
  );
};

export default BigCard;

const CardDiv = styled.div`
  background: linear-gradient(
      to bottom right,
      #0000 50%,
      rgb(231, 231, 231) 50.1%
    )
    bottom right/2em 2em no-repeat;
  display: inline-block;
  width: 6em;
  height: 15em;
  background-color: ${ThemeColor.basicColor};
  //border-left: solid;
  //border-bottom: solid;
  border-radius: 0.5em;
  padding: 1em;
  margin-bottom: 1em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  box-shadow: 0.25em -0.2em #6b71c8;
  transition: 0.2s;
  vertical-align: middle;
  &:hover {
    box-shadow: 0.3em -0.7em #9297d6;
    cursor: pointer;
  }
`;

interface BoxProps {
  name: string;
  value: string | number;
  onClick?: MouseEventHandler;
}

const ContentBox = ({ name, value, onClick }: BoxProps) => {
  return (
    <div>
      <b style={{ fontSize: "0.8em" }}>{name}</b>
      <div>
        <ProfileValue>{value}</ProfileValue>
      </div>
    </div>
  );
};

const ProfileValue = styled.div`
  background-color: ${ThemeColor.basicColorHover};
  border-radius: 0.2em;
  text-align: center;
  display: inline-block;
`;
