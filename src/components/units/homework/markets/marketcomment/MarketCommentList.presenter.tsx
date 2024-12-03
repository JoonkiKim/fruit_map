import { ChangeEvent, MouseEvent } from "react";

import { ListWrapper, Wrapper, ModalAlert } from "./MarketCommentList.style";
import InfiniteScroll from "react-infinite-scroller";
import {
  IQuery,
  IUseditemQuestion,
} from "../../../../../commons/types/generated/types";
import { MarketCommentItem } from "./MarketCommentList.presenterItem";

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
}

export function MarketCommentUI(props: IBoardCommentUIProps) {
  return (
    <>
      <Wrapper>
        <ListWrapper>
          {props.uniqueComments && (
            <InfiniteScroll
              pageStart={0}
              loadMore={props.onLoadMore}
              hasMore={true}
            >
              {props.uniqueComments?.map((el: IUseditemQuestion) => (
                /* // 맵 사용할때 쓰는 data다음 표현은 fetchBoardComments처럼 docs
          문서에서 가져오는거다(첫번째줄에 쓰인 소문자로 시작하는거) */

                <MarketCommentItem
                  key={el._id}
                  el={el}
                  onToggleModal={props.onToggleModal}
                  isOpen={props.isOpen}
                  onClickDelete={props.onClickDelete}
                />
              ))}
            </InfiniteScroll>
          )}
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
    </>
  );
}
