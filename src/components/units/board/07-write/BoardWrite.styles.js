import styled from "@emotion/styled";

export const RedInput = styled.input`
  border-color: red;
`;

export const BlueButton = styled.button`
  background-color: ${(props) => (props.isActive ? "yellow" : "")};
  // 위의 코드는 트루이면 노란색, false이면 빈문자열 즉 회색이 나오게 된다
`;
