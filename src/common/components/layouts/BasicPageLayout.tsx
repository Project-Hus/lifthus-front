import styled from "@emotion/styled";
import { ThemeColor } from "../../styles/theme.style";

const BasicPageLayout = styled.div`
  margin: auto;
  background-color: ${ThemeColor.backgroundColor};
  width: 100%;
  @media (min-width: 700px) {
    width: 60vw;
    min-width: 700px;
  }
`;

export const BasicPageLayoutNoMargin = styled.div`
  background-color: ${ThemeColor.backgroundColor};
  width: 100%;
  @media (min-width: 700px) {
    width: 60vw;
    min-width: 700px;
  }
`;

export default BasicPageLayout;
