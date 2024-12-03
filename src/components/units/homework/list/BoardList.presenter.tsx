import { Dispatch, MouseEvent, SetStateAction } from "react";

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
  ModalAlert,
} from "./BoardList.style";

import { formatDate } from "../../../../commons/libraries/utils";
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../../commons/types/generated/types";
import { ApolloQueryResult } from "@apollo/client";
import { Pagination } from "../../../commons/pagination";
import { v4 as uuidv4 } from "uuid";
import SearchBar from "../../../commons/searchBar";

interface IPropsBoardListUI {
  data?: Pick<IQuery, "fetchBoards">;

  // 함수의 타입은 무조건 () =>  형태로 타입 정의해준다
  moveToDetail: (event: MouseEvent<HTMLDivElement>) => void;
  moveToWrite: () => void;
  // moveToWrite는 event를 따로 안썼으니까 이렇게 빈 괄호 처리
  onClickDelete: (event: MouseEvent<HTMLButtonElement>) => void;
  onToggleAlertModal: () => void;
  isModalAlertOpen: boolean;
  modalMessage: string;
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs>,
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  startPage: number;
  setStartPage: Dispatch<SetStateAction<number>>;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  dataBoardsCount: Pick<IQuery, "fetchBoardsCount">;
  refetchCount: (
    variables?: Partial<IQueryFetchBoardsCountArgs>,
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoardsCount">>>;
}

export default function BoardListUI(props: IPropsBoardListUI) {
  return (
    <Wrapper>
      <MainContentWrapper>
        <SearchBar
          setKeyword={props.setKeyword}
          refetch={props.refetch}
          refetchCount={props.refetchCount}
        />

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
            <TitleWrapper id={el._id} onClick={props.moveToDetail}>
              {el.title
                .replaceAll(props.keyword, `@#$${props.keyword}@#$`)
                .split("@#$")
                .map((el: any) => (
                  <span
                    key={uuidv4()}
                    style={{ color: el === props.keyword ? "red" : "black" }}
                  >
                    {el}
                  </span>
                ))}
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
      {/* 페이지네이션은 해당 페이지의 presenter안에 컴포넌트로 넣어주는 것이고, 관련 js코드는 container에 넣어주기! index파일에 넣는게 아니다!! */}
      <Pagination
        startPage={props.startPage}
        setStartPage={props.setStartPage}
        refetch={props.refetch}
        dataBoardsCount={props.dataBoardsCount}
      ></Pagination>
      <ModalAlert
        open={props.isModalAlertOpen}
        onClose={props.onToggleAlertModal}
        onOk={props.onToggleAlertModal}
        onCancel={props.onToggleAlertModal}
      >
        <span>{props.modalMessage}</span>
      </ModalAlert>
    </Wrapper>
  );
}
