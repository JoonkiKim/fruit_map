import styled from "@emotion/styled";

import FbWrite from "../../../src/components/units/homework/fbwrite/FbWrite.container";
// import axios from "axios";
// import { useEffect, useState } from "react";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function FbWriteIndex() {
  return (
    <Wrapper>
      <FbWrite />
    </Wrapper>
  );
}
