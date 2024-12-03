import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  MutableRefObject,
  SetStateAction,
} from "react";

import {
  CommentBottomWrapper,
  CommentBtn,
  CommentContent,
  TextCounter,
  Wrapper,
  WriteWrapper,
  PositionWrapper,
} from "./MarketCommentWrt.style";
import {
  IQuery,
  IUseditemQuestion,
} from "../../../../../commons/types/generated/types";

interface IBoardCommentUIProps {
  data: Pick<IQuery, "fetchUseditemQuestions">;
  onChageInputs: (event: ChangeEvent<HTMLInputElement>) => void;
  onChageInputsTxt: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeRating: (value: number) => void;
  onSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickDelete: () => void;
  onToggleModal: (event: MouseEvent<HTMLButtonElement>) => void;
  // setRating: (value: number) => void;
  inputs: {
    contents: string;
  };
  rating: number;
  isOpen: boolean;
  isModalAlertOpen: boolean;
  onToggleAlertModal: () => void;
  modalMessage: string;
  onLoadMore: () => void;
  uniqueComments: IUseditemQuestion[];
  ell: IUseditemQuestion;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  onClickUpdate: () => Promise<void>;
  inputValue: string;
  inputRef: MutableRefObject<HTMLTextAreaElement>;
}

export function MarketCommentWriteUI(props: IBoardCommentUIProps) {
  return (
    <Wrapper>
      <WriteWrapper>
        <PositionWrapper>
          <CommentContent
            onChange={props.onChageInputsTxt}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포 시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            id="contents"
            defaultValue={
              props.ell?.contents ? props.ell?.contents : props.inputValue
            } // 여전히 defaultValue 사용
            ref={props.inputRef}

            // 여긴 디폴트 밸류 써도 되는듯? 어렵게 받아오는게 아니니까
          ></CommentContent>
          <CommentBottomWrapper>
            <TextCounter>
              {props.isEdit
                ? `${props.inputs.contents.length || props.ell?.contents?.length || 0}/100`
                : `${props.inputs.contents.length}/100`}
            </TextCounter>
            <CommentBtn
              onClick={
                props.isEdit === true ? props.onClickUpdate : props.onSubmit
              }
            >
              등록하기
            </CommentBtn>
          </CommentBottomWrapper>
        </PositionWrapper>
      </WriteWrapper>
    </Wrapper>
  );
}
