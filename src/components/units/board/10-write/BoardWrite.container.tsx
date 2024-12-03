import { useMutation } from "@apollo/client";
import { useState, ChangeEvent } from "react";
import BoardWriteUI from "./BoardWrite.presenter";

import { UPDATE_BOARD, 나의그래프큐엘셋팅 } from "./BoardWrite.query";
import { useRouter } from "next/router";
import { IBoardWriteProps, IMyvariables } from "./BoardWrite.types";

// interface IBoardWriteProps {
//   isEdit: Boolean;
//   data?: any;
//   // edit에서는 data가 필요하고, new에서는 안필요하니까 data에 ?를 넣어준다
// }
// // false값이 넘어가는게 아니라, isEdit라는게 넘어가기 때문에 객체로 넘겨줘야 한다

export default function BoardWrite(props: IBoardWriteProps) {
  // 끝에를 지우고 다시 쓰면 import가 자동으로 된다!
  const router = useRouter();
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // 나의함수는 mutation을 실행하기 위한 함수
  const [나의함수] = useMutation(나의그래프큐엘셋팅);
  // 위에서 만들어준 mutation하는거를 여기에 넣어준다
  // 나의그래프큐엘세팅에는 gql안에 createBoard가 담겨있음 -> updateBoard를 위한게 하나 필요함
  // 즉, '나의 함수'는 create를 위한거니까 update를 위한 mutation함수를 하나 만들어준다
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        // variables가 $랑 같은거임!
        // 아래에서 input을 통해 state에 저장된 값을 여기서 받아온다
        writer,
        title,
        contents,
      },
    });
    console.log(result);
    // 등록을 마친 이후에 상세 페이지로 이동할건데, 그러기 위해서는 등록된 게시물의 '번호'를 받아와야됨(상세 페이지는 목록페이지가 아니라 00번 번호로 이동이 완료되었습니다 같은게 있는 페이지임) -> createBoard안에 있는 number를 사용한다. 이건 입력하는 번호가 아니라 등록 완료 메시지에서 받아오는 것 중에 있는 number이다

    // 이동을 '시작'하는 페이지에서는 router.push랑 result.data.createBoard.number 조합을 사용한다!!!! <> 서버쪽으로 데이터를 보내줘야할때는 router.query.number같은 형태를 사용한다
    router.push(
      `/section10/10-02-typescript-board/${result.data.createBoard.number}`
    );
  };

  const onClickUpdate = async () => {
    // 등록하기는 onClickSubmit으로 수행하고, 수정하기는 여기서 수행한다!
    // async await를 붙여주는 이유는 수정하라고 요청을 보내놓고 수정하는 동안 기다리도록 하기 위해!

    // ** update할때 수정한 것만 백엔드로 보내게끔 하기위해 빈객체(myvariables)를 하나 만들고 거기에 넣고 빼고 하는 식으로 해준다 (number는 항상 있어야 되니까 객체 안에 그냥 넣어준다)

    // if문 사용해서 빈문자열이 아니면(수정을 해서 내용이 채워져있으면, true이면) writer라는 값을 writer라는 키 안에 넣어준다

    // *** myvariables에 처음 들어간게 number이니까 그거로 타입을 추론해버림 -> 명시해줘야됨
    // interface IMyvariables {
    //   number: number;
    //   writer?: string;
    //   title?: string;
    //   contents?: string;
    //   // 처음에는 number만 들어가니까 나머지 세개는 ?를 넣어줘야됨
    // }
    const myvariables: IMyvariables = { number: Number(router.query.number) };

    if (writer) {
      myvariables.writer = writer;
    }

    if (title) {
      myvariables.title = title;
    }
    if (contents) {
      myvariables.contents = contents;
    }

    const result = await updateBoard({
      variables: myvariables,
    });
    // 얘도 업데이트 이후에는 해당 게시글의 상세페이지로 이동해야 하니까 result활용해서 그 주소로 이동한다
    router.push(
      `/section10/10-02-typescript-board/${result.data.updateBoard.number}`
    );
  };

  // ***event는 리액트에서 제어를 하는거기때문에 우리가 타입 명시를 해주는게 아니라 위에서 react에서 ChangeEvent를 import해준다 -> 우리가 활용하려는 거에 맞는 타입을 넣어준다. 이경우에는 ChangeEvent<HTMLInputElement> 였던 거임
  const onChageWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };
  const onChageTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onChageContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  return (
    <div>
      <div>$$$$$$$$$$$ 여기는 컨테이너 입니다</div>
      <BoardWriteUI
        onClickSubmit={onClickSubmit}
        onClickUpdate={onClickUpdate}
        onChageWriter={onChageWriter}
        onChageTitle={onChageTitle}
        onChageContents={onChageContents}
        isEdit={props.isEdit}
        // index.js에서 isEdit에 true, false가 담겨서 들어오고 이게 또 presenter쪽 props를 타고 넘어감. 거기서도 props.isEdit로 받음
        data={props.data}
        // 이 data는 edit페이지에서 온 데이터이고 presenter로 또 넘겨주기 위해 여기서 또 보내준다
        // 등록하기 페이지 일때는 data가 없으니까 undefined가 되고, 수정하기 페이지일때는 data가 있으니까 props로 전달이 된다! -> 이것의 판단은 presenter에서 옵셔널체이닝으로 해줌
      />
      <div>$$$$$$$$$$$ 여기는 컨테이너 입니다</div>
    </div>
  );
}
