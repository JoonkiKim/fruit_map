import { MouseEvent } from "react";

import {
  Wrapper,
  Footer,
  MoveToWrite,
  MainContent,
  DeleteBoxWrapper,
  MainContentWrapper,
  DeleteBtn,
  IdWrapper,
  TitleWrapper,
  WriterWrapper,
  TimeStampWrapper,
  FirstLineWrapper,
  FIdWrapper,
  FTitleWrapper,
  FWriterWrapper,
  FTimeStampWrapper,
  FDeleteBoxWrapper,
} from "./BoardList.style";

import { formatDate } from "../../../../commons/libraries/utils";
import { IQuery } from "../../../../commons/types/generated/types";

interface IPropsBoardListUI {
  data?: Pick<IQuery, "fetchBoards">;
  // 함수의 타입은 무조건 () =>  형태로 타입 정의해준다
  moveToDetail: (event: MouseEvent<HTMLDivElement>) => void;
  moveToWrite: () => void;
  // moveToWrite는 event를 따로 안썼으니까 이렇게 빈 괄호 처리
  onClickDelete: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function BoardListUI(props: IPropsBoardListUI) {
  return (
    <Wrapper>
      <MainContentWrapper>
        <FirstLineWrapper>
          <FIdWrapper>ID</FIdWrapper>
          <FTitleWrapper>제목</FTitleWrapper>
          <FWriterWrapper>작성자</FWriterWrapper>
          <FTimeStampWrapper>날짜</FTimeStampWrapper>
          <FDeleteBoxWrapper>삭제 버튼</FDeleteBoxWrapper>
        </FirstLineWrapper>

        {props?.data?.fetchBoards.map((el: any) => (
          <MainContent key={el._id}>
            <IdWrapper>{el._id.slice(-4).toUpperCase()}</IdWrapper>
            {/* id의 뒤쪽 네 글자를 upperclass로 만들기 */}
            <TitleWrapper onClick={() => props.moveToDetail(el._id)}>
              {el.title}
            </TitleWrapper>
            <WriterWrapper>{el.writer}</WriterWrapper>
            <TimeStampWrapper>{formatDate(el.createdAt)}</TimeStampWrapper>
            <DeleteBoxWrapper>
              {/* 버튼을 id에 연동할때는 꼭 id를 써준다!!!!!! */}
              <DeleteBtn id={el._id} onClick={props.onClickDelete}>
                삭제
              </DeleteBtn>
            </DeleteBoxWrapper>
          </MainContent>
        ))}
      </MainContentWrapper>
      <Footer>
        {/* props를 통한 함수 입력 시 대소문자 구분 주의하기!!! */}
        <MoveToWrite onClick={props?.moveToWrite}>
          {" "}
          ✏️ 게시글 등록하기
        </MoveToWrite>
      </Footer>
    </Wrapper>
  );
}
