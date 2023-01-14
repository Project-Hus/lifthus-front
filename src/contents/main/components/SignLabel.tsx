import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const SignLabel_ = styled.label`
  font-size: 0.55em;
  font-weight: bold;
  color: rgb(191, 225, 235);
  margin-top: 1.5em;
  margin-bottom: 0.2em;
`;

const SignLabel = ({ children }: PropsWithChildren) => {
  return <SignLabel_>{children}</SignLabel_>;
};

export default SignLabel;
