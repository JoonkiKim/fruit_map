// 미리 코드에 기입해놓는게 아니라 브라우저의 입력창에 입력을 해서 최종적으로 서버에 전달되도록 하는 방법

import { useMutation } from "@apollo/client";
import { useState } from "react";
import BoardWriteUI from "../07-write/BoardWrite.presenter";
// // {}가 없는 애들은 export default로 가져온거고, 고르지 못하고 한개만 가져올 수 있음
// import Afkjsldfkjlsdf from "./BoardWrite.presenter";
// // export default로 가져온거는 이름을 아무렇게나 바꿔서 가져올수도 있다
// import BoardWriteUIu, { apple } from "./BoardWrite.presenter";
// // export default와 export를 함께 가져올 수도 있다
// //그래서 export default는 한번 밖에 못쓴다

import { 나의그래프큐엘셋팅 } from "../07-write/BoardWrite.query";
// / export로 추출한 컴포넌트는 {}를 사용해야하고, 원하는 것들을 골라서 가져올 수 있음

// import * as QQQ from "./BoardWrite.styles";
// // 이렇게 하면 export들을 '한번에' 가져올 수 있다. 근데 as로 다른 이름을 꼭 붙여줘야됨 -> QQQ.BlueButton 태그는 이렇게 사용하면 됨

export default function BoardWrite() {
  // css를 특정 조건에 따라 달라지게 하기 위해서 state를 이용한다
  // 여기서 시작해서 presenter로 갔다가 styles까지 도착해서 색깔을 결정한다
  const [isActive, setIsActive] = useState(false);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

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
    if (event.target.value && title && contents) {
      // 조건에 event.target.value를 쓰는 이유: writer를 써버리면 state업데이트가 안된 상태에서 setIsActive가 실행되기 때문에 state가 비어있다고 인식됨, 여기서 event.target.value를 사용하면 state업데이트가 안되더라도 해당 input창이 채워져있으면 조건을 만족하니까 이렇게 쓰는것. 아래의 title, contents도 마찬가지!
      // setState는 state를 임시저장해뒀다가 코드가 종료되면 그때 일괄로 한번에 바꾼다!

      setIsActive(true);
    }
  };

  const onChageTitle = (event) => {
    setTitle(event.target.value);
    if (writer && event.target.value && contents) {
      setIsActive(true);
    }
  };
  const onChageContents = (event) => {
    setContents(event.target.value);
    if (writer && title && event.target.value) {
      setIsActive(true);
    }
  };

  return (
    <div>
      <div>$$$$$$$$$$$ 여기는 컨테이너 입니다</div>
      <BoardWriteUI
        onClickSubmit={onClickSubmit}
        onChageWriter={onChageWriter}
        onChageTitle={onChageTitle}
        onChageContents={onChageContents}
        isActive={isActive}
        // 위의 것들이 객체의 형태로 props에 담겨서 presenter로 넘어감
      />
      <div>$$$$$$$$$$$ 여기는 컨테이너 입니다</div>
    </div>
  );
}
