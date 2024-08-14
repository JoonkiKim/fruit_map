import { ChangeEvent, useState } from "react";
// 항상 useState를 import해와서 써야된다
import { useMutation } from "@apollo/client";

import BoardWriteUI from "./BoardWrite.presenter";

import { useRouter } from "next/router";
import { MyDataTransfer, UPDATE_BOARD } from "./BoardWrite.queries";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
  IQuery,
  IUpdateBoardInput,
} from "../../../../commons/types/generated/types";

interface IBoardWriteProps {
  isEdit?: boolean;
  data?: Pick<IQuery, "fetchBoard">;
  // Query함수 통해서 {data} 받아올때의 타입은 코드젠에 있는 내용으로 한다!
}

export default function BoardWrite(props: IBoardWriteProps) {
  const [writer, setWriter] = useState("");
  const [password, setPw] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [postCode, setPostCode] = useState("");
  // const [adrs, setAdrs] = useState("");
  // const [ytube, setYtube] = useState("");
  // const [mainSetting, setMainSetting] = useState("");

  const [writerError, setWriterError] = useState("");
  const [pwError, setPwError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  // const [postCodeError, setPostCodeError] = useState("");
  // const [adrsError, setAdrsError] = useState("");
  // const [ytubeError, setYtubeError] = useState("");
  // const [mainSettingError, setMainSettingError] = useState("");

  const [myfx] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(MyDataTransfer);
  //

  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);

  const router = useRouter();

  const [isActive, setIsActive] = useState(false);

  // container에서 FETCH_BOARD를 통한 data생성을 안하는 이유는 등록하기 페이지에서 이걸 할필요가 없기 때문. 따라서 edit에서 data를 만들어줘서 거기서부터 props로 넘겨준다 (원칙상 container에 만드는게 맞는것 같았지만, 업무는 효율로 하는거다. edit에 있는게 효율적이다)

  // 일단 이렇게 input박스마다 나눠서 함수를 만들어주는게 맞다!

  // event를 매개변수로 쓸때 전부다 ChangeEvent<HTMLInputElement>로 타입 정의해줘야 한다
  function onChangeWriter(event: ChangeEvent<HTMLInputElement>): void {
    setWriter(event.target.value);
    if (event.target.value !== "") {
      setWriterError("");
    }
    if (event.target.value && password && title && content) {
      setIsActive(true);
    }
    // 다시 input박스에 뭐가 입력되면 (빈칸이 아니라면) 에러메시지를 없애준다
  }
  function onChangePw(event: ChangeEvent<HTMLInputElement>) {
    setPw(event.target.value);
    if (event.target.value !== "") {
      setPwError("");
    }
    if (writer && event.target.value && title && content) {
      setIsActive(true);
    }
  }
  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    if (event.target.value !== "") {
      setTitleError("");
    }
    if (writer && password && event.target.value && content) {
      setIsActive(true);
    }
  }
  // 만약에 textarea태그를 썼으면 ChangeEvent<HTMLTextAreaElement>를 썼어야 함
  function onChangeContent(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
    if (event.target.value !== "") {
      setContentError("");
    }
    if (writer && password && title && event.target.value) {
      setIsActive(true);
    }
  }

  const onSubmit = async (): Promise<void> => {
    // <거짓에 대하여>
    // 대부분은 참이고, 아래의 것들만 외우면 된다
    // 숫자 0, 빈문자열 "", false, null, undefined, NaN
    // 참<>거짓 바꾸는 기호는 느낌표 !

    if (!writer) {
      setWriterError("작성자가 입력되지 않았습니다!");
    }
    if (!password) {
      setPwError("비밀번호가 입력되지 않았습니다!");
    }
    if (!title) {
      setTitleError("제목이 입력되지 않았습니다!");
    }
    if (!content) {
      setContentError("내용이 입력되지 않았습니다!");
      return;
    }

    if (writer && password && title && content) {
      try {
        const result = await myfx({
          //
          variables: {
            createBoardInput: {
              writer,
              password,
              title,
              contents: content,
              // 왼쪽에 써있는 이름들은 서버에서 정의한대로 써야된다.
              // 그 내용은 플레이그라운드 docs에서 볼 수 있다
              // + 객체에서 키와 값이 동일하게 생겼으면 값이름을 생략할 수 있다 -> short-handproperty
            },
          },
        });
        console.log(result);
        // alert("회원가입이 완료되었습니다!");
        // 전부다 뭐가 입력되어있으면 회원가입 완료 메시지 출력

        if (!result.data) {
          alert("시스템에 문제가 있습니다");
          return;
        }

        router.push(`/boards/${result.data.createBoard._id}`);
        // pages는 안 써줘도 된다
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };

  const onClickUpdate = async () => {
    // 아무것도 수정 안했을때 알러트도 날려주기

    // 아래의 코드를 if else의 형태로 작성하면 else가 많아졌을때 코드 확인이 어려워서 유지보수가 어려움
    // 유지보수의 용이성을 위해 '맞으면 뭘 하고'의 형태가 아니라 '에러부터 걸러내고 다 괜찮으면 뭘 해라'의 형태로 한다 => early-exit 패턴이라고 부름. 에러부터 내보내고 실행한다

    // => 이런 과정을 '리팩토링'이라고 부름 : 결과는 똑같은데 내용이 더 쉬워짐

    if (!title && !content) {
      alert("수정한 내용이 없습니다");
      return;
      // 에러를 내보내고 아래를 실행하면 안되니까 return으로 멈춰준다
    }
    if (!password) {
      alert("비밀번호를 입력해주세요");
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    // password와 boardId는 밑에서 만들어주면 타입이 미리 적용되는 문제를 해결할 수 있다
    if (title) {
      updateBoardInput.title = title;
    }

    if (content) {
      updateBoardInput.contents = content;
    }
    try {
      // 여기서 updateBoard를 쓰려면 queries에서 updateBoard를 정의해주고 import까지 해서 써야된다

      if (typeof router.query.boardId !== "string") {
        alert("시스템에 문제가 있습니다");
        return;
      }
      const result = await updateBoard({
        variables: {
          password,
          // 위에서 string이 아닌것들을 걸러주었으니까 여기서는 router.query.boardId만 써주면됨
          boardId: router.query.boardId,
          // boardId: String(router.query.boardId),
          // 혹은 이렇게 string으로 감싸주면 해결!
          updateBoardInput,
        },
      });

      if (!result.data) {
        alert("시스템에 문제가 있습니다");
        return;
      }
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error) {
      // error가 Error의 인스턴스이면 Error가 갖고 있는 기능인 message를 사용할 수 있다
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <BoardWriteUI
      aa={onChangeWriter}
      bb={onChangePw}
      cc={onChangeTitle}
      dd={onChangeContent}
      onSubmit={onSubmit}
      onClickUpdate={onClickUpdate}
      writerError={writerError}
      pwError={pwError}
      titleError={titleError}
      contentError={contentError}
      isActive={isActive}
      isEdit={props.isEdit}
      data={props.data}
      // props반환할때 그냥 같은 이름으로 해주면 훨씬 편하다!
    />
  );
}
