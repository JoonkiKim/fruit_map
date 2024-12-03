import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import {
  IMutation,
  IMutationCreateUseditemQuestionArgs,
  IMutationDeleteUseditemQuestionArgs,
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
  IUseditemQuestion,
} from "../../../../../commons/types/generated/types";

import {
  useState,
  ChangeEvent,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { MarketCommentUI } from "./MarketCommentList.presenter";
import {
  CREAT_USEDITEM_QUESTION,
  DELETE_USEDITEM_QUESTION,
  FETCH_USEDITEM_QUESTIONS,
} from "./MarketCommentList.queries";

interface IBoardMarketCommenProps {
  ell?: IUseditemQuestion;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
}

export default function MarketCommentList(props: IBoardMarketCommenProps) {
  const router = useRouter();
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );
  const [createUseditemQuestion] = useMutation<
    Pick<IMutation, "createUseditemQuestion">,
    IMutationCreateUseditemQuestionArgs
  >(CREAT_USEDITEM_QUESTION);

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USEDITEM_QUESTIONS, {
    variables: { useditemId: String(router.query.useditemId) },
  });

  const [deleteUseditemQuestion] = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USEDITEM_QUESTION);

  // <입력값 리팩토링>
  const [inputs, setInputs] = useState({
    contents: "",
  });
  const [rating, setRating] = useState<number>(0);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  if (!router || typeof router.query.useditemId !== "string") {
    return <></>; // 훅 호출을 막기 위해 빈 상태를 반환합니다.
  }

  // id를 연결하는 query를 할때는 useQuery안에 id를 같이 넣어줘야 한다

  const onChageInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };
  const onChageInputsTxt = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({
      ...inputs,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };
  function onChangeRating(value: number) {
    setRating(value);
  }
  const onToggleModal = (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.getAttribute("data-id");
    setSelectedCommentId(id); // 삭제할 댓글의 ID 저장
    setIsOpen((prev) => !prev);
  };
  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  const onSubmit = async () => {
    if (inputs.contents) {
      try {
        const result = await createUseditemQuestion({
          //
          variables: {
            createUseditemQuestionInput: {
              contents: inputs.contents,
            },
            useditemId: String(router.query.useditemId),
          },

          refetchQueries: [
            {
              query: FETCH_USEDITEM_QUESTIONS,
              variables: { useditemId: router.query.useditemId },
            },
          ],
        });
        console.log(result);
        setInputs({ contents: "" });
      } catch (error) {
        if (error instanceof Error) setModalMessage(error.message);
        onToggleAlertModal();
      }
    }
  };

  const onClickDelete = async () => {
    if (!selectedCommentId) return;
    try {
      // 아래에서 event.target.id 에 빨간줄 뜨는 문제는 event.target이 태그임을 선언해주는 코드로 해결할 수 있다

      await deleteUseditemQuestion({
        variables: {
          useditemQuestionId: selectedCommentId,
        },
        refetchQueries: [
          {
            variables: { useditemId: String(router.query.useditemId) },
            query: FETCH_USEDITEM_QUESTIONS,
            // 얘도 boardId링크를 해줘야 되는 거였음
          },
        ],
      });
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) setModalMessage(error.message);
      onToggleAlertModal();
    }
  };

  // const onLoadMore = (): void => {
  //   if (data === undefined) return;

  //   fetchMore({
  //     variables: {
  //       page: Math.ceil((data.fetchUseditemQuestions.length ?? 10) / 10) + 1,
  //     },
  //     // 위의 수식은 기존 페이지 + 1을 만드는 코드
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (fetchMoreResult.fetchUseditemQuestions === undefined) {
  //         return {
  //           fetchUseditemQuestions: [...prev.fetchUseditemQuestions],
  //         };
  //       }

  //       return {
  //         fetchUseditemQuestions: [
  //           ...prev.fetchUseditemQuestions,
  //           ...fetchMoreResult.fetchUseditemQuestions,
  //         ],
  //       };
  //     },
  //   });
  // };

  const onLoadMore = (): void => {
    if (!data) return;

    fetchMore({
      variables: {
        page: Math.ceil((data.fetchUseditemQuestions.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditemQuestions) return prev;

        // 기존 댓글과 새로 불러온 댓글 병합
        const mergedQuestions = [
          ...prev.fetchUseditemQuestions,
          ...fetchMoreResult.fetchUseditemQuestions,
        ];

        // 중복 제거 (id가 같은 댓글을 제거)
        const uniqueQuestions = mergedQuestions.filter(
          (question, index, self) =>
            index === self.findIndex((q) => q._id === question._id),
        );

        // 중복이 제거된 댓글 리스트 반환
        return { fetchUseditemQuestions: uniqueQuestions };
      },
    });
  };

  const uniqueComments = data?.fetchUseditemQuestions.filter(
    (comment, index, self) =>
      index === self.findIndex((c) => c._id === comment._id),
  );

  //   console.log(data);
  return (
    <div>
      <MarketCommentUI
        data={data}
        onChageInputs={onChageInputs}
        onChageInputsTxt={onChageInputsTxt}
        onChangeRating={onChangeRating}
        onSubmit={onSubmit}
        onClickDelete={onClickDelete}
        isOpen={isOpen}
        onToggleModal={onToggleModal}
        inputs={inputs}
        rating={rating}
        isModalAlertOpen={isModalAlertOpen}
        onToggleAlertModal={onToggleAlertModal}
        modalMessage={modalMessage}
        onLoadMore={onLoadMore}
        uniqueComments={uniqueComments}
      />
    </div>
  );
}
