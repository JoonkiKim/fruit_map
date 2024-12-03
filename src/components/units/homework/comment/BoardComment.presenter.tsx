import { formatDate } from "../../../../commons/libraries/utils";

import { ChangeEvent, MouseEvent } from "react";

import {
  CommentBottomWrapper,
  CommentBtn,
  CommentContent,
  CommentTitle,
  CommentWriter,
  CommentPw,
  CommentWritPass,
  Rating,
  ListWrapper,
  TextCounter,
  Wrapper,
  WriteWrapper,
  PositionWrapper,
  CommentListWrapper,
  RatingWrapper,
  PicWrapper,
  TextContentWrapper,
  MainContentWrapper,
  WriterWrapper,
  DeleteBtn,
  Avatar,
  WritRatWrapper,
  DateWrapper,
  StarFive,
  StarResult,
  ModalAlert,
} from "./BoardComment.style";
import { Modal } from "antd";
import InfiniteScroll from "react-infinite-scroller";

interface IBoardCommentUIProps {
  list: any;
  onChageInputs: (event: ChangeEvent<HTMLInputElement>) => void;
  onChageInputsTxt: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeRating: (value: number) => void;
  onSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickDelete: (id: string) => void;
  onChangeDeletePw: (event: ChangeEvent<HTMLInputElement>) => void;
  onToggleModal: () => void;
  // setRating: (value: number) => void;
  inputs: {
    writer: string;
    password: string;
    contents: string;
  };
  rating: number;
  isOpen: boolean;
  isModalAlertOpen: boolean;
  onToggleAlertModal: () => void;
  modalMessage: string;
  onLoadMore: () => void;
}

export function BoardCommentUI(props: IBoardCommentUIProps) {
  return (
    <Wrapper>
      <WriteWrapper>
        <CommentTitle>💬댓글</CommentTitle>
        <CommentWritPass>
          <CommentWriter
            onChange={props.onChageInputs}
            type="text"
            placeholder="작성자"
            id="writer"
            value={props.inputs.writer}
            // ** 위에서 빈문자열이 된 state를 태그에 연결
          ></CommentWriter>
          <CommentPw
            onChange={props.onChageInputs}
            type="text"
            placeholder="비밀번호"
            id="password"
            value={props.inputs.password}
          ></CommentPw>
          <Rating>
            <StarFive onChange={props.onChangeRating} value={props.rating} />
          </Rating>
        </CommentWritPass>

        <PositionWrapper>
          <CommentContent
            onChange={props.onChageInputsTxt}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포 시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            id="contents"
            value={props.inputs.contents}
          ></CommentContent>
          <CommentBottomWrapper>
            <TextCounter>1/100</TextCounter>
            <CommentBtn onClick={props.onSubmit}>등록하기</CommentBtn>
          </CommentBottomWrapper>
        </PositionWrapper>
      </WriteWrapper>
      <ListWrapper>
        <InfiniteScroll
          pageStart={0}
          loadMore={props.onLoadMore}
          hasMore={true}
        >
          {props.list?.fetchBoardComments.map((el: any) => (
            /* // 맵 사용할때 쓰는 data다음 표현은 fetchBoardComments처럼 docs
          문서에서 가져오는거다(첫번째줄에 쓰인 소문자로 시작하는거) */
            <CommentListWrapper key={el._id}>
              <PicWrapper>
                <Avatar src="/images/avatar.png" />
              </PicWrapper>
              <MainContentWrapper>
                <WritRatWrapper>
                  <WriterWrapper>{el.writer}</WriterWrapper>
                  <RatingWrapper>
                    <StarResult disabled value={el.rating} />
                    {/* 반복되는 코드는 el을 붙여줘야 한다! */}
                  </RatingWrapper>
                </WritRatWrapper>

                <TextContentWrapper>{el.contents}</TextContentWrapper>
                <DateWrapper>{formatDate(el.createdAt)}</DateWrapper>
              </MainContentWrapper>

              {/* 
            <삭제버튼 모달 만들면서 배운 lesson learn>
            - X버튼을 눌렀을때 '토글'이 열려야 했다. 바로 onClickDelete가 실행되는게 아니라. 
            - onClickDelete함수 안에 모달 닫기를 위해 setIsOpen을 넣어줘야했다
            - onOK에 onClickDelete를 연결해주고 이건 마우스 event가 아니니까 el._id를 통해 id를 직접 함수에 전달해줘야 했다
            - onOk로 함수가 호출되면 타입이 안 맞으니까 래핑된 함수 안에서 onClickDelete를 호출해줘야 했다. void반환 여부에 따라 타입 일치 여부가 달라진다


            */}
              <DeleteBtn id={el._id} onClick={props.onToggleModal}>
                x
              </DeleteBtn>
              {props.isOpen && (
                <Modal
                  open={true}
                  onOk={() => {
                    props.onClickDelete(el._id); // 래핑된 함수 안에서 onClickDelete 호출
                  }}
                  onCancel={props.onToggleModal}
                >
                  <input type="text" onChange={props.onChangeDeletePw}></input>
                </Modal>
              )}
            </CommentListWrapper>
          ))}
        </InfiniteScroll>
      </ListWrapper>
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
