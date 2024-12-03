import { WriterWrapper } from "../comment/BoardComment.style";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { firebaseapp } from "../../../../../src/commons/libraries/firebase";

import {
  //   FIdWrapper,
  FirstLineWrapper,
  FTitleWrapper,
  FWriterWrapper,
  MainContent,
  MainContentWrapper,
  MoveToWrite,
  TitleWrapper,
} from "../list/BoardList.style";
import { useEffect, useState } from "react";
import { ContentWrapper, CreatedTime } from "../detail/BoardDetail.style.ts";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

export const FContentsWrapper = styled.div`
  width: 20%;
  /* background-color: blue; */
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

export const CreatedAtDiv = styled.div``;

export default function FbList() {
  const [list, setList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const onClickFetch = async () => {
      const board = collection(getFirestore(firebaseapp), "board");
      const result = await getDocs(board);

      const datas = result.docs.map((el) => ({
        id: el.id,
        ...el.data(),
        createdAt: el.data().createdAt.toDate(), // Timestamp -> Date 객체로 변환
      }));
      console.log(datas);
      const sortedData = datas.sort((a, b) => b.createdAt - a.createdAt);

      setList(sortedData);
    };

    onClickFetch();
  }, []);

  const moveToWrite = () => {
    router.push(`/boards/myfbwrite`);
  };

  // createdAt데이터는 사람이 읽을 수 없어서 형태를 바꿔줘야된다
  const formatDate = (date) => {
    return date.toLocaleString(); // Date 객체를 사람이 읽을 수 있는 문자열로 변환
  };

  return (
    <div>
      <MainContentWrapper>
        <FirstLineWrapper>
          <FTitleWrapper>제목</FTitleWrapper>
          <FContentsWrapper>내용</FContentsWrapper>
          <FWriterWrapper>작성자</FWriterWrapper>
          <CreatedAtDiv>작성 시간</CreatedAtDiv>
        </FirstLineWrapper>

        {list.map((el: any) => (
          <MainContent key={el.id}>
            {/* <IdWrapper>{}</IdWrapper> */}
            {/* id의 뒤쪽 네 글자를 upperclass로 만들기 */}
            <TitleWrapper>{el.title}</TitleWrapper>
            <ContentWrapper>{el.contents}</ContentWrapper>
            <WriterWrapper>{el.writer}</WriterWrapper>
            <CreatedTime>{formatDate(el.createdAt)}</CreatedTime>
          </MainContent>
        ))}

        {/* props를 통한 함수 입력 시 대소문자 구분 주의하기!!! */}
        <MoveToWrite onClick={moveToWrite}> ✏️ 게시글 등록하기</MoveToWrite>
      </MainContentWrapper>
    </div>
  );
}
