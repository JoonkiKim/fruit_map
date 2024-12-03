import styled from "@emotion/styled";
import FbList from "../../../src/components/units/homework/fblist/FbList.container";
// import axios from "axios";
// import { useEffect, useState } from "react";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function LiveCats() {
  return (
    <Wrapper>
      <FbList />
    </Wrapper>
  );
}
