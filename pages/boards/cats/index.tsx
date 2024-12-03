import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function LiveCats() {
  const [cat, setCat] = useState("");

  useEffect(() => {
    // async 넣어주기 위해 함수를 하나 만들고 밑에서 실행해줘야 된다
    const onClickSync = async (): Promise<void> => {
      const result = await axios.get(
        "https://api.thecatapi.com/v1/images/search",
      );

      // 배열에 숫자가 담겨있을때는 []를 이용한 인덱스를 써준다!!!!
      console.log(result.data[0].url); // 사진 주소
      setCat(result.data[0].url);
    };
    onClickSync();
  }, []);

  return (
    <Wrapper>
      <img src={cat} />
    </Wrapper>
  );
}
