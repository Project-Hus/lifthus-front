import styled from "@emotion/styled";
import { ThemeColor } from "../../styles/theme.style";

const BasicPageLayout = styled.div`
  margin: auto;
  background-color: ${ThemeColor.backgroundColor};
  @media (min-width: 700px) {
    width: 60vw;
    min-width: 700px;
  }
`;

export const BaisPageLayoutNoMargin = styled.div`
  background-color: ${ThemeColor.backgroundColor};
  @media (min-width: 700px) {
    width: 60vw;
    min-width: 700px;
  }
`;

export default BasicPageLayout;
