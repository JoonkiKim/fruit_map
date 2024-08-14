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
} from "./BoardComment.style";

interface IBoardCommentUIProps {
  list: any;
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePw: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeRating: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickDelete: (event: MouseEvent<HTMLButtonElement>) => void;
  writer: string;
  password: string;
  content: string;
  rating: string;
}

export function BoardCommentUI(props: IBoardCommentUIProps) {
  return (
    <Wrapper>
      <WriteWrapper>
        <CommentTitle>💬댓글</CommentTitle>
        <CommentWritPass>
          <CommentWriter
            onChange={props.onChangeWriter}
            type="text"
            placeholder="작성자"
            value={props.writer}
            // ** 위에서 빈문자열이 된 state를 태그에 연결
          ></CommentWriter>
          <CommentPw
            onChange={props.onChangePw}
            type="text"
            placeholder="비밀번호"
            value={props.password}
          ></CommentPw>
          <Rating
            onChange={props.onChangeRating}
            type="text"
            placeholder="점수 입력"
            value={props.rating}
          ></Rating>
        </CommentWritPass>
        <PositionWrapper>
          <CommentContent
            onChange={props.onChangeContent}
            type="text"
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포 시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            value={props.content}
          ></CommentContent>
          <CommentBottomWrapper>
            <TextCounter>1/100</TextCounter>
            <CommentBtn onClick={props.onSubmit}>등록하기</CommentBtn>
          </CommentBottomWrapper>
        </PositionWrapper>
      </WriteWrapper>
      <ListWrapper>
        {props.list?.fetchBoardComments.map((el) => (
          /* // 맵 사용할때 쓰는 data다음 표현은 fetchBoardComments처럼 docs
          문서에서 가져오는거다(첫번째줄에 쓰인 소문자로 시작하는거) */
          <CommentListWrapper key={el._id}>
            <PicWrapper>
              <Avatar src="/images/avatar.png" />
            </PicWrapper>
            <MainContentWrapper>
              <WritRatWrapper>
                <WriterWrapper>{el.writer}</WriterWrapper>
                <RatingWrapper>{el.rating}</RatingWrapper>
              </WritRatWrapper>

              <TextContentWrapper>{el.contents}</TextContentWrapper>
              <DateWrapper>{formatDate(el.createdAt)}</DateWrapper>
            </MainContentWrapper>
            <DeleteBtn id={el._id} onClick={props.onClickDelete}>
              x
            </DeleteBtn>
          </CommentListWrapper>
        ))}
      </ListWrapper>
    </Wrapper>
  );
}
