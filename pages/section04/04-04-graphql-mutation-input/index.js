// 미리 코드에 기입해놓는게 아니라 브라우저의 입력창에 입력을 해서 최종적으로 서버에 전달되도록 하는 방법

import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

// 그래프큐엘 코드 생성!
const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    # 변수로 받고 싶으면 위에서 이게 무슨 타입인지 선언해줘야됨
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();

  // 나의함수는 mutation을 실행하기 위한 함수
  const [나의함수] = useMutation(나의그래프큐엘셋팅);
  // 위에서 만들어준 mutation하는 여기에 넣어준다
  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        // variables가 $랑 같은거임!
        // 아래에서 input을 통해 state에 저장된 값을 여기서 받아온다
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result);
    // 아래의 버튼을 클릭하면 onClickSubmit이 실행되고, 그러면 나의함수() 이게 실행되면서 mutation에서 등록할 값이 디비에 전송되고 그에따라 서버가 우리한테 보내주는 데이터(게시물이 정상적으로 등록되었습니다 등)가 콘솔에 찍힌다
  };

  const onChageWriter = (event) => {
    setWriter(event.target.value);
  };
  const onChageTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChageContents = (event) => {
    setContents(event.target.value);
  };

  return (
    // 항상 div로 감싸줘야 한다!!!!!
    <div>
      작성자: <input type="text" onChange={onChageWriter} />
      제목 : <input type="text" onChange={onChageTitle} />
      내용 : <input type="text" onChange={onChageContents} />
      <button onClick={onClickSubmit}>GRAPHGQL-API 요청하기</button>;
    </div>
  );
}
