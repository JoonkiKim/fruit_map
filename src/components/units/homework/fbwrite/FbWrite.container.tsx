import {
  collection,
  addDoc,
  getFirestore,
  Timestamp,
} from "firebase/firestore/lite";
import { firebaseapp } from "../../../../../src/commons/libraries/firebase";

import { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  /* background-color: green; */
  width: 1000px;
  display: flex;
  flex-direction: column;
`;

const LineWrapper = styled.div`
  /* background-color: red; */
  width: 1000px;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const LineTitle = styled.div`
  /* background-color: red; */
  width: 100px;
`;

const RegisterBtn = styled.button`
  width: 100px;
  height: 50px;
`;

export default function FbWrite() {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const router = useRouter();
  function onChangeWriter(event: ChangeEvent<HTMLInputElement>): void {
    setWriter(event.target.value);
  }

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>): void {
    setTitle(event.target.value);
  }

  function onChangeContents(event: ChangeEvent<HTMLInputElement>): void {
    setContents(event.target.value);
  }

  const onClickSumit = async () => {
    const board = collection(getFirestore(firebaseapp), "board");
    // firebaseapp에 접속할 수 있게 하는 코드, 정보를 가져온다.
    // 정보를 가져온다음에 DB라고 할 수 있는 collection에서 "board"라는 서류봉투를 가져온다

    // board라는 collection에 문서를 하나 추가하고 싶으면 addDoc사용 (Mutation같은거임)

    // await를 해줘야 게시글 리스트에서 반영이 된다
    await addDoc(board, {
      writer,
      title,
      contents,
      createdAt: Timestamp.now(),
      // 입력시간을 넣어주려면 Timestamp찍고 -> 읽을 수 있는 형태로 바꿔줘야 한다
    });

    router.push(`/boards/myfirebase`);
  };

  return (
    <Wrapper>
      <LineWrapper>
        <LineTitle>작성자 : </LineTitle>
        <input onChange={onChangeWriter} type="text" />
      </LineWrapper>
      <LineWrapper>
        <LineTitle>제목 : </LineTitle>
        <input onChange={onChangeTitle} type="text" />
      </LineWrapper>
      <LineWrapper>
        <LineTitle>내용 : </LineTitle>
        <input onChange={onChangeContents} type="text" />
      </LineWrapper>
      <RegisterBtn onClick={onClickSumit}>등록하기</RegisterBtn>
    </Wrapper>
  );
}
