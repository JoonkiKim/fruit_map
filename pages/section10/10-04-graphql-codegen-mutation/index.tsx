// Mutation, Query에 타입 지정하기

// Mutation에는 타입이 두개 있음
// 첫번째는 result의 타입, 두번째는 variables에 대한 타입. 근데 타입스크립트는 이게 다 만들어져있어서 우리는 import해서 쓰기만하면됨

// query도 마찬가지
// 첫번째는 data의 타입, 두번째는 variables에 대한 타입.

// 함수의 타입지정은 useMution뒤, uesQuery뒤처럼 함수 뒤에 만들어주는거다

// ex)
// const [counter, setCounter] = useState<number>(0);

import { useMutation, gql } from "@apollo/client";
import {
  IMutation,
  IMutationCreateBoardArgs,
} from "../../../src/commons/types/generated/types";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  // const [나의함수] = useMutation<result의 타입, variables의 타입>(나의그래프큐엘셋팅);

  // 타입스크립트의 타입 모음에서 IMutation을 뽑아오고 그중에서 Pick을 통해 createBoard만 활용한다

  const [나의함수] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
    // CreateBoard이름은 위에 gql에서 지정한거로 가져오는거임
  >(나의그래프큐엘셋팅);

  // 이렇게 타입을 지정해주면 variables에서 타입에러가 나면 알려준다
  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        writer: "훈이",
        title: "안녕하세요",
        contents: "반갑습니다",
      },
    });
    console.log(result);
  };
  return <button onClick={onClickSubmit}>GRAPHGQL-API 요청하기</button>;
}
