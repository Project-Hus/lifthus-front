import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const FormLabel_ = styled.label`
  font-size: 0.55em;
  font-weight: bold;
  color: rgb(191, 225, 235);
  margin-top: 1.5em;
  margin-bottom: 0.2em;
`;

const FormLabel = ({ children }: PropsWithChildren) => {
  return <FormLabel_>{children}</FormLabel_>;
};

export default FormLabel;
