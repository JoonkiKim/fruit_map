// Board를 생성하고 생성된 넘버를 따라서 페이지 이동하는 방법

import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    # 변수로 받고 싶으면 위에서이게 무슨 타입인지 선언해줘야됨
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const router = useRouter();

  const [나의함수] = useMutation(나의그래프큐엘셋팅);
  const onClickSubmit = async () => {
    // 클라이언트에서 잘 요청해도 서버가 멈춰있을 수 있기 떄문에 항상 아래의 try~catch안에 요청코드를 넣어줘서 에러에 대비한다
    // try안에 있는 코드실행에 성공하면 catch로 넘어가지 않고, 실행에 실패하면 딱 멈추고 catch로 넘어감

    try {
      const result = await 나의함수({
        variables: {
          // variables가 $랑 같은거임!
          writer: "훈이",
          title: "안녕하세요",
          contents: "반갑습니다",
        },
        // 이렇게 해주면 함수에서 값이 나가서 $writer등등이 써있는 곳으로 간다
      });
      console.log(result);
      // 아래의 버튼을 클릭하면 onClickSubmit이 실행되고, 그러면 나의함수() 이게 실행되면서 mutation에서 등록할 값이 디비에 전송되고 그에따라 서버가 우리한테 보내주는 데이터(게시물이 정상적으로 등록되었습니다 등)가 콘솔에 찍힌다
      console.log(result.data.createBoard.number);
      // 데이터 생성하고 만들어진 number를 통해서 주소를 만들어야 되는데 위의 콘솔은 그걸 확인하는 것
      // router.push(
      //   "/section05/05-05-dynamic-routing-board-mutation-moved/" +
      //     result.data.createBoard.number
      // );
      // 아래 백틱 사용하는 방식이 변수 넣어주기는 더 좋다
      router.push(
        `/section05/05-05-dynamic-routing-board-mutation-moved/${result.data.createBoard.number}`
      );
    } catch (error) {
      alert(error.message);
    }
  };
  //html이 한줄일때는 괄호 안해도 됨
  return <button onClick={onClickSubmit}>GRAPHGQL-API 요청하기</button>;
}
