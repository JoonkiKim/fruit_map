import { formatDate } from "../../../../../commons/libraries/utils";

import {
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
  UpdateBtn,
} from "./MarketCommentList.style";
import { Modal } from "antd";
import { IUseditemQuestion } from "../../../../../commons/types/generated/types";
import { MouseEvent, useState } from "react";

import MarketCommentWrite from "../marketcommentwrite/MarketCommentWrt.container";

interface IBoardCommentItemProps {
  el: IUseditemQuestion;
  key: string;
  onToggleModal: (event: MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
  onClickDelete: () => void;
}

export function MarketCommentItem(props: IBoardCommentItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const onClickUpdate = (): void => {
    setIsEdit(true);
  };

  return (
    <>
      {!isEdit ? (
        <CommentListWrapper key={props.el._id}>
          <PicWrapper>
            <Avatar src="/images/avatar.png" />
          </PicWrapper>
          <MainContentWrapper>
            <WritRatWrapper>
              <WriterWrapper></WriterWrapper>
              <RatingWrapper></RatingWrapper>
            </WritRatWrapper>

            <TextContentWrapper>{props.el.contents}</TextContentWrapper>
            <DateWrapper>{formatDate(props.el.createdAt)}</DateWrapper>
          </MainContentWrapper>

          <UpdateBtn
            // data-id={props.el._id}
            onClick={onClickUpdate}
          >
            fix
          </UpdateBtn>

          <DeleteBtn data-id={props.el._id} onClick={props.onToggleModal}>
            x
          </DeleteBtn>
          {props.isOpen && (
            <Modal
              open={true}
              onOk={props.onClickDelete}
              onCancel={props.onToggleModal}
            >
              정말 삭제하시겠습니까?
            </Modal>
          )}
        </CommentListWrapper>
      ) : (
        <MarketCommentWrite
          isEdit={true}
          setIsEdit={setIsEdit}
          ell={props.el}
        />
      )}
    </>
  );
}
