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
  YoutubeScreen,
  TTWrapper,
  PinTip,
  LikeButton,
  ModalAlert,
} from "./BoardDetail.style.ts";

import { formatDate } from "../../../../commons/libraries/utils";

import { MouseEvent } from "react";
import { IQuery } from "../../../../commons/types/generated/types";

import { LikeOutlined, LikeFilled } from "@ant-design/icons";

interface IPropsBoardDetailUI {
  liked: boolean;
  data?: Pick<IQuery, "fetchBoard">;
  onClickMove: (event: MouseEvent<HTMLButtonElement>) => void;
  handleLike: () => void;
  isModalAlertOpen: boolean;
  onToggleAlertModal: () => void;
  modalMessage: string;
  moveToList: () => void;
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
            <CreatedTime>
              {" "}
              {formatDate(props.data?.fetchBoard?.createdAt)}{" "}
            </CreatedTime>
          </ProfWrapper>
          <TTWrapper
            title={
              <>
                {props.data?.fetchBoard.boardAddress?.address} <br />
                {props.data?.fetchBoard.boardAddress?.addressDetail}
              </>
            }
          >
            <PinTip src="/images/pin.png"></PinTip>
          </TTWrapper>
        </HeaderWrapper>

        <ContentWrapper>
          <ContentTitle>{props.data?.fetchBoard?.title}</ContentTitle>

          {/* 이미지를 세개 불러오는거니까 그것도 map으로 뿌려주는거였음! */}
          {props.data?.fetchBoard?.images.map((el) => (
            <img key={el} src={`https://storage.googleapis.com/${el}`} />
          ))}
          <ContentReal>{props.data?.fetchBoard?.contents}</ContentReal>

          {props.data?.fetchBoard?.youtubeUrl && (
            <YoutubeScreen url={props.data?.fetchBoard?.youtubeUrl} />
          )}

          <LikeButton
            type="text"
            icon={
              props.liked ? (
                <LikeFilled
                  style={{
                    fontSize: "50px",
                    color: "#ffd600",
                  }}
                />
              ) : (
                <LikeOutlined
                  style={{
                    fontSize: "50px",
                    color: "#ffd600",
                  }}
                />
              )
            }
            onClick={props.handleLike}
          ></LikeButton>
        </ContentWrapper>
      </SecWrapper>
      <BtnWrapper>
        <ToList onClick={props.moveToList}>목록으로</ToList>
        <ToFix onClick={props.onClickMove}>수정하기</ToFix>
        <ToDelete>삭제하기</ToDelete>
      </BtnWrapper>
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
