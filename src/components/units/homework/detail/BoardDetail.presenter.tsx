import {
  Wrapper,
  SecWrapper,
  BtnWrapper,
  HeaderWrapper,
  ContentWrapper,
  PicWrapper,
  ProfWrapper,
  Avatar,
  WriterName,
  CreatedTime,
  ContentTitle,
  ContentReal,
  ToList,
  ToFix,
  ToDelete,
} from "../../../../../styles/moved_css";

import { MouseEvent } from "react";

interface IPropsBoardDetailUI {
  data: any;
  onClickMove: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function BoardDetailUI(props: IPropsBoardDetailUI) {
  console.log(props);
  return (
    <Wrapper>
      <SecWrapper>
        <HeaderWrapper>
          {/* 태그 새로 만들때 절대절대 대문자로 시작하기 */}
          <PicWrapper>
            {/* 이미지를 불러올땐 styled 안에 태그를 따로 만들어주자 */}
            <Avatar src="/images/avatar.png" />
          </PicWrapper>
          <ProfWrapper>
            {/* 옵셔널 체이닝을 꼭꼭꼭 해줘야지 데이터 불러오기 전에 미리 보여주고, 그 다음에 데이터를 불러온다. 안그러면 에러난다 */}
            {/* "조건부 렌더링" */}
            <WriterName>{props.data?.fetchBoard?.writer}</WriterName>
            {/* 밖에서 query로 되어있는 data 받아올때는 props만 붙여주면됨! */}
            <CreatedTime>{props.data?.fetchBoard?.createdAt}</CreatedTime>
          </ProfWrapper>
        </HeaderWrapper>

        <ContentWrapper>
          <ContentTitle>{props.data?.fetchBoard?.title}</ContentTitle>
          <ContentReal>{props.data?.fetchBoard?.contents}</ContentReal>
        </ContentWrapper>
      </SecWrapper>
      <BtnWrapper>
        <ToList>목록으로</ToList>
        <ToFix onClick={props.onClickMove}>수정하기</ToFix>
        <ToDelete>삭제하기</ToDelete>
      </BtnWrapper>
    </Wrapper>
  );
}
